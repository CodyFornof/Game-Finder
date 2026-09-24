// 
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useLeagues } from '@/hooks/use-active-leagues';
import { useGameData } from '@/hooks/use-game-data';
import { useEffect, useRef, useState } from "react";
import { AppContext } from '@/context/AppContext';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  // Gets the formatted data
  const games = useGameData();
  // Gets the leagues from the games
  const leagues = useLeagues(games);
  // Gets the first league so the app knows which league to open up to first
  const firstLeague = leagues[0]
  const [currentLeague, setLeague] = useState(firstLeague?.toLowerCase() ?? 'nfl')
  const colorScheme = useColorScheme(); // Great for light/dark mode adjusted from the device settings

  return (
  <AppContext.Provider value={{ games, leagues, currentLeague, setLeague }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ headerShown: false , presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  </AppContext.Provider>
  );
}
