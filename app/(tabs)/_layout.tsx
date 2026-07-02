// This page defines dark/light theme, defines the main screen, and adjusts the status bar that has the time, battery, and signal
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { AppContext, useAppData } from '@/context/AppContext';
import { useLeagues } from '@/hooks/use-active-leagues';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGameData } from '@/hooks/use-game-data';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const appData = useAppData();

  const games = useGameData()
  const leagues = useLeagues(games);

  return (
    //AppContext allows us to move variable values from screen to screen
    //These tabs are not currently used as no additional screens are needed but good to keep for future updates
    <AppContext.Provider value={{games, leagues}}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="finder"
        options={{
          title: 'Finder',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="viewfinder.circle.fill" color={color} />,
        }}
      />
    </Tabs>
    </AppContext.Provider>
  );
}
