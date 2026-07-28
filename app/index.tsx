import { AppContext } from '@/context/AppContext';
import { useLeagues } from '@/hooks/use-active-leagues';
import { useGameData } from '@/hooks/use-game-data';
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType } from 'react-native';
import { NativeRouter, Navigate, Route, Routes } from "react-router-native";
import FinderScreen from './(tabs)/finder';
import splashScreen from './splash';

const screenLogo: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/Logo/gpt_trans_logo.png"),
};

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true)

  // Gets the formatted data
const games = useGameData();
// Gets the leagues from the games
const leagues = useLeagues(games);
// Gets the first league so the app knows which league to open up to first
const firstLeague = leagues[0]
const [currentLeague, setLeague] = useState(firstLeague?.toLowerCase() ?? 'mlb')

const renderCount = useRef(0);
renderCount.current++;

//When all data is populated we can set to no longer loading - removes splash screen and opens app
useEffect(() => {
  if(games && leagues && leagues.length > 0){
    setIsLoading(false)
  }
}, [games, leagues])

// Has splash screen open for as long as waiting to load
if(isLoading) return splashScreen()

  return ( 
    <AppContext.Provider value={{games, leagues, currentLeague, setLeague}}>
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tabs" replace />} />
        <Route path="/tabs/*" element={<FinderScreen />} />
      </Routes>
    </NativeRouter>
    </AppContext.Provider>
  );
}