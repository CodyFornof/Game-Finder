import { AppContext } from '@/context/AppContext';
import { useLeagues } from '@/hooks/use-active-leagues';
import { useGameData } from '@/hooks/use-game-data';
import { useEffect, useRef, useState, useContext } from "react";
import { ImageSourcePropType } from 'react-native';
//import { NativeRouter, Navigate, Route, Routes } from "react-router-native";
import FinderScreen from './(tabs)/finder';
import splashScreen from './splash';
import { useSelectionsHydrated } from '@/hooks/use-selections-hydrated';
import { useRouter, Redirect } from 'expo-router';

const screenLogo: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/Logo/gpt_trans_logo.png"),
};

export default function HomeScreen() {

const { games, leagues } = useContext(AppContext);
const selectionsLoaded = useSelectionsHydrated();

const renderCount = useRef(0);
renderCount.current++;

const isLoading = !(games && leagues && leagues.length > 0 && selectionsLoaded);

// Has splash screen open for as long as waiting to load
if(isLoading) return splashScreen()

  return <Redirect href="/finder" />;
}