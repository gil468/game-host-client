import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const nextSongRequest = async () => {
  return await axios.get(`${serverUrl}/next-round`);
};

export const endGameRequest = async () => {
  return await axios.get(`${serverUrl}/end-game`);
};

export const createGameRequest = async () => {
  return await axios.get(`${serverUrl}/create-game`);
};

export const skipRoundRequest = async () => {
  return await axios.post(`${serverUrl}/end-round`);
};
