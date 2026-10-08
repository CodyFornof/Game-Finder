import { useSelectionStore } from '@/data/channel-selection-store';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import channels from '@/data/channels.json';
import streamingServices from '@/data/streaming-services.json';
import addOns from '@/data/add-ons.json';
import providers from '@/data/providers.json';
import { Checkbox } from '@/components/checkbox';
import { broadcastStyles } from '@/constants/Styles';

useSelectionStore.getState().loadCatalog(channels, providers);

export function ChannelRow({ channelId }: { channelId: string }) {
  const channel = useSelectionStore((state) => state.channels[channelId]);
  const selected = useSelectionStore((state) => state.isChannelSelected(channelId));
  const toggleChannel = useSelectionStore((state) => state.toggleChannel);

  if (!channel) return null;

  return (
    <ThemedView style={broadcastStyles.channelRow}>
      <Checkbox
        style={broadcastStyles.checkbox}
        value={selected}
        onValueChange={() => toggleChannel(channelId)}
      />
      <ThemedText style={broadcastStyles.channelText}>{channel.name}</ThemedText>
    </ThemedView>
  );
}

export function ProviderRow({ providerId }: { providerId: string }) {
  const provider = useSelectionStore((state) => state.providers[providerId]);
  const selected = useSelectionStore((state) => state.isProviderSelected(providerId));
  const toggleProvider = useSelectionStore((state) => state.toggleProvider);

  if (!provider) return null;

  return (
    <ThemedView style={broadcastStyles.channelRow}>
      <Checkbox
        style={broadcastStyles.checkbox}
        value={selected}
        onValueChange={() => toggleProvider(providerId)}
      />
      <ThemedText style={broadcastStyles.channelText}>{provider.name}</ThemedText>
    </ThemedView>
  );
}

export function StreamingRow({ id, name }: { id: string; name: string }) {
  const selected = useSelectionStore((s) => s.selectedStreamingIds.has(id));
  const toggleStreaming = useSelectionStore((s) => s.toggleStreaming);

  return (
    <ThemedView style={broadcastStyles.channelRow}>
      <Checkbox
        style={broadcastStyles.checkbox}
        value={selected}
        onValueChange={() => toggleStreaming(id)}
      />
      <ThemedText style={broadcastStyles.channelText}>{name}</ThemedText>
    </ThemedView>
  );
}

export function AddOnRow({ id, name }: { id: string; name: string }) {
  const selected = useSelectionStore((s) => s.selectedAddOnIds.has(id));
  const toggleAddOn = useSelectionStore((s) => s.toggleAddOn);

  return (
    <ThemedView style={broadcastStyles.channelRow}>
      <Checkbox
        style={broadcastStyles.checkbox}
        value={selected}
        onValueChange={() => toggleAddOn(id)}
      />
      <ThemedText style={broadcastStyles.channelText}>{name}</ThemedText>
    </ThemedView>
  );
}