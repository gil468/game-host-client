import { io } from 'socket.io-client';
import { GameCreationProps } from '../game/components/GameCreatorPage';
import { GamePrepareDto } from '../game/components/GenreSelectionPage';

export const socket = io(`${import.meta.env.VITE_SERVER_URL}/game-manager`); // Singleton pattern

export const socketEmit = async <T extends any>(
  eventName: string,
  room?: number,
  ...args: any[]
): Promise<T> => {
  const emitArgs = room !== undefined ? [room, ...args] : [...args];

  return await new Promise((resolve, reject) => {
    socket.emit(eventName, ...emitArgs, (res: any) => {
      if (res.error) {
        reject(res.error);
      } else {
        resolve(res as T);
      }
    });
  });
};

export const createGameRequest = async (gameSettings: GameCreationProps) => {
  return await socketEmit<{ gameId: string; gameSecret: string }>(
    'create-game',
    undefined,
    gameSettings
  );
};

export const prepareGameRequest = async () => {
  return await socketEmit<GamePrepareDto>('get-available-playlists', undefined);
};
