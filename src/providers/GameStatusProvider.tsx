import React, { createContext, PropsWithChildren, useState } from 'react';
import { GameState } from '../events/addEvent';

interface GameStatusContextType {
    gameStatus: GameState;
    setGameStatus: React.Dispatch<React.SetStateAction<GameState>>;
  }
  
export const GameStatusContext = createContext<GameStatusContextType>(undefined);  

const GameStatusProvider = ({children} : PropsWithChildren) => {
  const [gameStatus, setGameStatus] = useState<GameState>('None');

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export default GameStatusProvider;
