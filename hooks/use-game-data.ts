import { getNBAGames } from '@/services/nba';
import { gameStore } from '@/store/gamestore';
import { useEffect, useState } from 'react';

export function useGameData() {
const [nba, setNBA] = useState([null])

  useEffect(() => {
    async function fetchData() {
      const response = await getNBAGames();
      const games = gameStore(response)
      setNBA(games)
      }
    fetchData();
    }, []);
  return nba;
};


// let response = getNBAGames();
// let nba;
// //const [nba, setNBA] = useState(null)

//   useEffect(() => {
//     async function fetchData() {
//       const response = await getNBAGames();
//       nba = gameStore(response)
//       //setNBA(games)
//     }
//     fetchData();
//     }, []);
//   return nba;
// };