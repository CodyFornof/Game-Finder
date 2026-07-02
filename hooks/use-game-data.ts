import { getGameData } from '@/services/get-game-data';
import { gameStore } from '@/store/gamestore';
import { useEffect, useState } from 'react';

//Organizes the game data into their own arrays by league
export function useGameData() {
const [games, setgames] = useState<Record<string, any[]>>({
  nba: [],
  nfl: [],
  mlb: [],
});


  useEffect(() => {
    async function fetchData() {
      //Gets the data from api and puts it in response
      const response = await getGameData();
      // Organizes the response into the format we need the data
      const games = gameStore(response)
      //Adds the data to the object of arrays above for each league
      setgames(games)
      }
    fetchData();
    }, []);
  return games;
};
