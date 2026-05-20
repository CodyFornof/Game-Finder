import { AppContext } from '@/context/AppContext';
import { useLeagues } from '@/hooks/use-active-leagues';
import { useGameData } from '@/hooks/use-game-data';
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType } from 'react-native';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FinderScreen from './(tabs)/finder';
import splashScreen from './splash';

const screenLogo: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/Logo/gpt_trans_logo.png"),
};

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true)

const games = useGameData();
const leagues = useLeagues(games);

const renderCount = useRef(0);
renderCount.current++;
console.log(`Render #${renderCount.current}:`);

// LOGGER FOR DEBUGGING HERE
//This is running TWICE (bad, I think?)
console.log(`index GAMES: ${games}`)


useEffect(() => {
  if(games && leagues && leagues.length > 0){
    setIsLoading(false)
    // LOGGER FOR DEBUGGING HERE
    // This is running ONCE (good)
    console.log(`in useEffect GAMES: ${games}`)
  }
}, [games, leagues])

if(isLoading) return splashScreen()

  return (
    <AppContext.Provider value={{games, leagues}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tabs" replace />} />
        <Route path="/tabs/*" element={<FinderScreen />} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}