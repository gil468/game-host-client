import axios from 'axios';

export const nextSongRequest = async () => {
  return await axios.get('http://localhost:3000/next-round');
};

export const endGameRequest = async () => {
  return await axios.get('http://localhost:3000/end-game');
};

export const createGameRequest = async () => {
  return await axios.get('http://localhost:3000/create-game');
};

export const skipRoundRequest = async () => {
  return await axios.post('http://localhost:3000/end-round');
};
