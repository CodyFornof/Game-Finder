import { useMemo } from 'react';

//Takes the Game Data and gets all of the leagues that have games today
//Puts the leagues into an array so we can use them in the league bar on home page
//This way leagues with no games today will not show up to be pressed
export function useLeagues(games: Record<string, any[]>) {
  return useMemo(() => {
    return Object.keys(games)
      .filter(league => games[league].length > 0)
      .map(l => l.toUpperCase());
  }, [games]);
};