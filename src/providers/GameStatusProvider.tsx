import React, { createContext, PropsWithChildren, useState } from 'react';

interface GameStatusContextType {
  gameProps: GameProps | undefined;
  setGameProps: React.Dispatch<
    React.SetStateAction<Partial<GameProps | undefined>>
  >;
}

export type GameState =
  | 'None'
  | 'WaitingRoom'
  | 'Running'
  | 'Buzzered'
  | 'BetweenRounds'
  | 'Ended';

type GameProps = {
  gameStatus: GameState;
  pinCode?: number;
  currRound: number;
  gameRounds: number;
};

export const GameStatusContext = createContext<GameStatusContextType>(
  {} as GameStatusContextType
);

const GameStatusProvider = ({ children }: PropsWithChildren) => {
  const [gameProps, setGameProps] = useState<GameProps>();

  return (
    <GameStatusContext.Provider
      value={{
        gameProps,
        setGameProps: (partial) => {
          partial &&
            setGameProps((curr) => ({
              ...(curr ?? ({} as GameProps)),
              ...partial,
            }));
        },
      }}
    >
      {children}
    </GameStatusContext.Provider>
  );
};

export default GameStatusProvider;
