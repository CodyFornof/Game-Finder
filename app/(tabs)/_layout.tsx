// This page defines dark/light theme, defines the main screen, and adjusts the status bar that has the time, battery, and signal
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { AppContext, useAppData } from '@/context/AppContext';
import { useLeagues } from '@/hooks/use-active-leagues';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGameData } from '@/hooks/use-game-data';
import { Tabs } from 'expo-router';
import { NavigationIcon } from '@/components/ui/navbar-icon'


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  const appData = useAppData();

  const games = useGameData()
  const leagues = useLeagues(games);

  return (
    //AppContext allows us to move variable values from screen to screen
    //These tabs are not currently used as no additional screens are needed but good to keep for future updates
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22c55e',
        headerShown: false,
        tabBarButton: HapticTab as any,
      }}>
      <Tabs.Screen
        name="finder"
        options={{
          title: 'Finder',
          tabBarIcon: ({ focused }) => (
            <NavigationIcon
              focused={focused}
              activeIcon={require('@/assets/images/navbar/home_on.png')}
              inactiveIcon={
                colorScheme ==='dark'
                  ? require('@/assets/images/navbar/dark/home_off.png')
                  : require('@/assets/images/navbar/light/home_off.png')
              }
            />
          ),
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="viewfinder.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="broadcast"
        options={{
          title: 'Broadcast',
          tabBarIcon: ({ focused }) => (
            <NavigationIcon
              focused={focused}
              activeIcon={require('@/assets/images/navbar/broadcast_on.png')}
              inactiveIcon={
                colorScheme ==='dark'
                  ? require('@/assets/images/navbar/dark/broadcast_off.png')
                  : require('@/assets/images/navbar/light/broadcast_off.png')
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
