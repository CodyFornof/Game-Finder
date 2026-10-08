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
  let backgroundColor;
  if(value){
    backgroundColor = CHECKED_COLOR;
  }else{
      const colorScheme = useColorScheme() ?? 'light';
  const oppositeTheme = colorScheme === 'light' ? 'dark' : 'light';

  // If the caller passed an override for the opposite theme, use it; otherwise fall back to the opposite theme's default background
  const overrideColor = colorScheme === 'light' ? darkColor : lightColor;
  backgroundColor = overrideColor ?? Colors[oppositeTheme].background;
  }

  return <Pressable style={[{ backgroundColor }, style]} onPress={onValueChange} {...otherProps} />;
}
