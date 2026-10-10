import { Text } from 'react-native';
import { ThemedText } from '@/components/themed-text'
import { activeGameCard, gameCard, headerStyles } from '@/constants/Styles';

export default function BroadcastText({ text, selectedNames }: { text: string; selectedNames: Set<string> }) {
  // split on commas that are NOT inside parentheses
  const parts = text.split(/,\s*(?![^()]*\))/);

  return (
    <ThemedText>
      {parts.map((part, i) => {
        const on = selectedNames.has(part.trim().toLowerCase());
        return (
          <Text key={i} style={on ? gameCard.networkNameSelected : gameCard.networkName}>
            {part}
            {i < parts.length - 1 ? ', ' : ''}
          </Text>
        );
      })}
    </ThemedText>
  );
}