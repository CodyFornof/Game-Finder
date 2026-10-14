// channelSelectionStore.ts
//
// Pattern: normalize channels/providers as data, store SELECTIONS (not per-item
// booleans) in a Zustand store, and DERIVE each channel's checked state.
//
// npm install zustand

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ---------- Data shapes (load these from your API / a static JSON file) ----------

export type Channel = {
  id: string;
  name: string;
};

export type Provider = {
  id: string;
  name: string;
  // The set of channel ids included if this provider/package is selected.
  channelIds: string[];
};

// Used for web storage (web will not save channel selections like mobile does)
const noopStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

// ---------- Store state ----------

type SelectionState = {
  // All available data (set once on load, treated as read-only reference data)
  channels: Record<string, Channel>;
  providers: Record<string, Provider>;
  // Reverse index: channelId -> providerIds that include it. Built once from
  // `providers`, used for fast "is this channel covered by any selected provider" checks.
  channelToProviders: Record<string, string[]>;

  // The only two pieces of "user selection" state you actually need:
  selectedProviderIds: Set<string>;
  selectedStreamingIds: Set<string>;
  selectedAddOnIds: Set<string>;
  manualOverrides: Map<string, boolean>; // channelId -> explicit user choice

  // Actions
  loadCatalog: (channels: Channel[], providers: Provider[]) => void;
  toggleProvider: (providerId: string) => void;
  toggleChannel: (channelId: string) => void;
  toggleStreaming: (id: string) => void;
  toggleAddOn: (id: string) => void;
  resetChannelOverride: (channelId: string) => void; // "follow provider again"
  clearAll: () => void;

  // Derived getters (pure functions of state, no re-render surprises)
  isProviderSelected: (providerId: string) => boolean;
  isChannelSelected: (channelId: string) => boolean;
  getSelectedChannelIds: () => string[];
};

export const useSelectionStore = create<SelectionState>()(
  persist(
    // ---------- everything you already had goes in here ----------
    (set, get) => ({
      channels: {},
      providers: {},
      channelToProviders: {},
      selectedStreamingIds: new Set(),
      selectedAddOnIds: new Set(),
      selectedProviderIds: new Set(),
      manualOverrides: new Map(),
 
      loadCatalog: (channelList, providerList) => {
        const channels = Object.fromEntries(channelList.map((c) => [c.id, c]));
        const providers = Object.fromEntries(providerList.map((p) => [p.id, p]));
 
        const channelToProviders: Record<string, string[]> = {};
        for (const provider of providerList) {
          for (const channelId of provider.channelIds) {
            (channelToProviders[channelId] ??= []).push(provider.id);
          }
        }
 
        set({ channels, providers, channelToProviders });
      },
 
      toggleStreaming: (id) =>
        set((state) => {
          const next = new Set(state.selectedStreamingIds);
          next.has(id) ? next.delete(id) : next.add(id);
          return { selectedStreamingIds: next };
        }),
 
      toggleAddOn: (id) =>
        set((state) => {
          const next = new Set(state.selectedAddOnIds);
          next.has(id) ? next.delete(id) : next.add(id);
          return { selectedAddOnIds: next };
        }),
 
      toggleProvider: (providerId) => {
        set((state) => {
          const next = new Set(state.selectedProviderIds);
          next.has(providerId) ? next.delete(providerId) : next.add(providerId);
          return { selectedProviderIds: next };
        });
      },
 
      toggleChannel: (channelId) => {
        set((state) => {
          const current = get().isChannelSelected(channelId);
          const nextOverrides = new Map(state.manualOverrides);
          nextOverrides.set(channelId, !current);
          return { manualOverrides: nextOverrides };
        });
      },
 
      resetChannelOverride: (channelId) => {
        set((state) => {
          const next = new Map(state.manualOverrides);
          next.delete(channelId);
          return { manualOverrides: next };
        });
      },
 
      clearAll: () =>
        set({
          selectedProviderIds: new Set(),
          manualOverrides: new Map(),
          selectedStreamingIds: new Set(),
          selectedAddOnIds: new Set(),
        }),
 
      isProviderSelected: (providerId) => get().selectedProviderIds.has(providerId),
 
      isChannelSelected: (channelId) => {
        const state = get();
        if (state.manualOverrides.has(channelId)) {
          return state.manualOverrides.get(channelId)!;
        }
        const providerIds = state.channelToProviders[channelId] ?? [];
        return providerIds.some((pid) => state.selectedProviderIds.has(pid));
      },
 
      getSelectedChannelIds: () => {
        const state = get();
        return Object.keys(state.channels).filter((id) => get().isChannelSelected(id));
      },
    }),
    // ---------- persist options ----------
    {
      name: 'selections:v1',
      storage: createJSONStorage(() =>
        Platform.OS === 'web' ? noopStorage : AsyncStorage
      ),
 
      // What gets written to the phone (Sets/Maps become arrays)
      partialize: (state) => ({
        selectedProviderIds: [...state.selectedProviderIds],
        selectedStreamingIds: [...state.selectedStreamingIds],
        selectedAddOnIds: [...state.selectedAddOnIds],
        manualOverrides: [...state.manualOverrides],
      }),
 
      // How it's rebuilt on launch (arrays back into Sets/Maps)
      merge: (persisted: any, current) => ({
        ...current,
        selectedProviderIds: new Set(persisted?.selectedProviderIds ?? []),
        selectedStreamingIds: new Set(persisted?.selectedStreamingIds ?? []),
        selectedAddOnIds: new Set(persisted?.selectedAddOnIds ?? []),
        manualOverrides: new Map(persisted?.manualOverrides ?? []),
      }),
    }
  )
);
