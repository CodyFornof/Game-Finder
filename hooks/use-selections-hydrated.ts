import { useEffect, useState } from 'react';
import { useSelectionStore } from '@/data/channel-selection-store';

export function useSelectionsHydrated() {
  const [hydrated, setHydrated] = useState(useSelectionStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useSelectionStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useSelectionStore.persist.hasHydrated());
    return unsub;
  }, []);

  return hydrated;
}