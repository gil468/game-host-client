import React, { createContext, PropsWithChildren, useState } from 'react';

interface GameStatusContextType {
  gameStatus: GameState;
  setGameStatus: React.Dispatch<React.SetStateAction<GameState>>;
  pinCode: number | undefined;
  setPinCode: React.Dispatch<React.SetStateAction<number | undefined>>;
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
  const [pinCode, setPinCode] = useState<number | undefined>(undefined);

  return (
    <GameStatusContext.Provider
      value={{ gameStatus, setGameStatus, pinCode, setPinCode }}
    >
      {children}
    </GameStatusContext.Provider>
  );
};

export default GameStatusProvider;
