import { useSelectionStore } from '@/data/channel-selection-store';
import { useMemo } from 'react';

export default function useSelectedNames(streamingData: any[], addOnData: any[]) {
  const channels = useSelectionStore((s) => s.channels);
  const providers = useSelectionStore((s) => s.providers);
  const channelToProviders = useSelectionStore((s) => s.channelToProviders);
  const selectedProviderIds = useSelectionStore((s) => s.selectedProviderIds);
  const manualOverrides = useSelectionStore((s) => s.manualOverrides);
  const selectedStreamingIds = useSelectionStore((s) => s.selectedStreamingIds);
  const selectedAddOnIds = useSelectionStore((s) => s.selectedAddOnIds);

  return useMemo(() => {
    const names = new Set<string>();

    // Channels: manual override wins, otherwise follow selected providers
    for (const id of Object.keys(channels)) {
      const selected = manualOverrides.has(id)
        ? manualOverrides.get(id)!
        : (channelToProviders[id] ?? []).some((pid) => selectedProviderIds.has(pid));
      if (selected) names.add(channels[id].name.toLowerCase());
    }

    streamingData.forEach((s) => selectedStreamingIds.has(s.id) && names.add(s.name.toLowerCase()));
    addOnData.forEach((a) => selectedAddOnIds.has(a.id) && names.add(a.name.toLowerCase()));

    // Streaming-style "providers" like your 014 exception
    selectedProviderIds.forEach((pid) => {
      if (providers[pid]) names.add(providers[pid].name.toLowerCase());
    });

    return names;
  }, [channels, providers, channelToProviders, selectedProviderIds, manualOverrides,
      selectedStreamingIds, selectedAddOnIds, streamingData, addOnData]);
}