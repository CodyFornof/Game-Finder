import { useGameData } from '@/hooks/use-game-data';
import { useEffect, useState } from "react";
import { ImageSourcePropType } from 'react-native';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FinderScreen from './(tabs)/finder';
import splashScreen from './splash';

const screenLogo: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/Logo/gpt_trans_logo.png"),
};

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true)

const nba = useGameData();

useEffect(() => {
  if(nba){
    setIsLoading(false)
  }
}, [nba])

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await useGameData();
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, []);

  if(isLoading) return splashScreen()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tabs" replace />} />
        <Route path="/tabs/*" element={<FinderScreen />} />
      </Routes>
    </BrowserRouter>
  );
}