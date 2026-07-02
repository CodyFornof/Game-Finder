//This file is used to send variables from screen to screen. Specifically to send the clicked game data to the game details page
import { createContext, useContext } from 'react';

export const AppContext = createContext<any>(null);
export const useAppData = () => useContext(AppContext);