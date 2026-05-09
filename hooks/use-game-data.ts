import { getGameData } from '@/services/get-game-data';
import { gameStore } from '@/store/gamestore';
import { useEffect, useState } from 'react';

export function useGameData() {
const [nba, setNBA] = useState([null])

  useEffect(() => {
    async function fetchData() {
      const response = await getGameData();
      console.log("RESPONSE BELOW HERE RESPONSE BELOW HERE");
      console.log(response);
      const games = gameStore(response)
      setNBA(games)
      }
    fetchData();
    }, []);
  return nba;
};
