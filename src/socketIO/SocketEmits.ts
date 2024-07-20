import { io } from 'socket.io-client';

export const socket = io(`${import.meta.env.VITE_SERVER_URL}/game-manager`); // Singleton pattern

export const socketEmit = async <T extends any>(
  eventName: string,
  room?: number
): Promise<T> => {
  return await new Promise((resolve, reject) => {
    socket.emit(eventName, room, (res: any) => {
      if (res.error) {
        reject(res.error);
      } else {
        resolve(res as T);
      }
    });
  });
};

export const createGameRequest = async () => {
  return await socketEmit<{ gameId: string }>('create-game');
};
