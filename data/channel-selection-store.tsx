// channelSelectionStore.ts
//
// Pattern: normalize channels/providers as data, store SELECTIONS (not per-item
// booleans) in a Zustand store, and DERIVE each channel's checked state.
//
// npm install zustand

import { create } from 'zustand';

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

export const useSelectionStore = create<SelectionState>((set, get) => ({
  channels: {},
  providers: {},
  channelToProviders: {},
  selectedStreamingIds: new Set(),
  selectedAddOnIds: new Set(),
  selectedProviderIds: new Set(),
  manualOverrides: new Map(),

  loadCatalog: (channelList, providerList) => {
    const channels = Object.fromEntries(channelList.map(c => [c.id, c])); 
    const providers = Object.fromEntries(providerList.map(p => [p.id, p]));

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
    console.log(id);
    return { selectedStreamingIds: next };
  }),

toggleAddOn: (id) =>
set((state) => {
    const next = new Set(state.selectedAddOnIds);
    next.has(id) ? next.delete(id) : next.add(id);
    console.log(id);
    return { selectedAddOnIds: next };
}),

  toggleProvider: (providerId) => {
    set((state) => {
      const next = new Set(state.selectedProviderIds);
      next.has(providerId) ? next.delete(providerId) : next.add(providerId);
      console.log(providerId);
      return { selectedProviderIds: next };
    });
  },

  toggleChannel: (channelId) => {
    set((state) => {
      const current = get().isChannelSelected(channelId);
      const nextOverrides = new Map(state.manualOverrides);
      nextOverrides.set(channelId, !current);
      console.log(channelId);
      return { manualOverrides: nextOverrides };
    });
  },

  // Lets a channel go back to "whatever the selected providers say" instead
  // of staying pinned to a manual choice forever. Handy for an "undo" affordance.
  resetChannelOverride: (channelId) => {
    set((state) => {
      const next = new Map(state.manualOverrides);
      next.delete(channelId);
      return { manualOverrides: next };
    });
  },

  clearAll: () => set({ selectedProviderIds: new Set(), manualOverrides: new Map(), selectedStreamingIds: new Set(), selectedAddOnIds: new Set(), }),

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
}));

// ---------- Usage in a component ----------
//
// Select only the slice you need so a toggle on one row doesn't re-render
// all 100+ rows. This is the other half of the performance story: even with
// a single store, subscribing to the WHOLE store in every row would defeat
// the purpose.
//
// function ChannelRow({ channelId }: { channelId: string }) {
//   const channel = useSelectionStore((s) => s.channels[channelId]);
//   const selected = useSelectionStore((s) => s.isChannelSelected(channelId));
//   const toggleChannel = useSelectionStore((s) => s.toggleChannel);
//
//   return (
//     <Pressable onPress={() => toggleChannel(channelId)}>
//       <Checkbox value={selected} />
//       <Text>{channel.name}</Text>
//     </Pressable>
//   );
// }
//
// Wrap ChannelRow in React.memo so it only re-renders when ITS channel's
// selection state actually changes, not when any other row's does.