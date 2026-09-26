//This file configures the ThemedView component that makes the background of the View the same color needed for dark/light mode
import { Pressable, type ViewProps } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Checkbox({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const oppositeTheme = colorScheme === 'light' ? 'dark' : 'light';

  // If the caller passed an override for the opposite theme, use it; otherwise fall back to the opposite theme's default background
  const overrideColor = colorScheme === 'light' ? darkColor : lightColor;
  const backgroundColor = overrideColor ?? Colors[oppositeTheme].background;

  return <Pressable style={[{ backgroundColor }, style]} {...otherProps} />;
}
