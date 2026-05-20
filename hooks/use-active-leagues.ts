import { useMemo } from 'react';

export function useLeagues(games: Record<string, any[]>) {
  return useMemo(() => {
    return Object.keys(games)
      .filter(league => games[league].length > 0)
      .map(l => l.toUpperCase());
  }, [games]);
};