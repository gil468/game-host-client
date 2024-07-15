import React, { createContext, PropsWithChildren, useState } from 'react';

interface GameStatusContextType {
  gameStatus: GameState;
  setGameStatus: React.Dispatch<React.SetStateAction<GameState>>;
}

export type GameState =
  | 'None'
  | 'WaitingRoom'
  | 'Running'
  | 'Buzzered'
  | 'BetweenRounds'
  | 'Ended';

export const GameStatusContext =
  createContext<GameStatusContextType>(undefined);

const GameStatusProvider = ({ children }: PropsWithChildren) => {
  const [gameStatus, setGameStatus] = useState<GameState>('None');

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export default GameStatusProvider;
