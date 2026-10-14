//This file configures the ThemedView component that makes the background of the View the same color needed for dark/light mode
import { Pressable, type ViewProps } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  value: boolean;
  onValueChange: () => void;
};

const CHECKED_COLOR = '#0EAD00';


export function Checkbox({ style, lightColor, darkColor, value, onValueChange, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';   // always runs

  const oppositeTheme = colorScheme === 'light' ? 'dark' : 'light';
  const overrideColor = colorScheme === 'light' ? darkColor : lightColor;

  const backgroundColor = value
    ? CHECKED_COLOR
    : overrideColor ?? Colors[oppositeTheme].background;

  return <Pressable style={[{ backgroundColor }, style]} onPress={onValueChange} {...otherProps} />;
}
