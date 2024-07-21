//buzzer-revoked

import { io } from 'socket.io-client';

export const socket = io(`${import.meta.env.VITE_SERVER_URL}/game-client`); // Singleton pattern

// export const socketEmit = async <T extends any>(
//   eventName: string,
//   room?: number
// ): Promise<T> => {
//   return await new Promise((resolve, reject) => {
//     socket.emit(eventName, room, (res: any) => {
//       if (res.error) {
//         reject(res.error);
//       } else {
//         resolve(res as T);
//       }
//     });
//   });
// };

export const buzzerRevokedResponse = async () => {
  return await socket.on('buzzer-revoked');
};

export const buzzerGrantedResponse = async () => {
  return await socket.on('buzzer-granted', (playerName: string) => {
    console.log('Buzzer granted to:', playerName);
  });
};
