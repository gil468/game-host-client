import axios from "axios";

const useRequests = ()=> {
  const nextSong = async () => {
    return await axios.get('http://localhost:3000/next-round');
  }

  const endGame = async () => {
    return await axios.get('http://localhost:3000/end-game');
  }

  const createGame = async () => {
    return await axios.get('http://localhost:3000/create-game');
  }

  const skipRound = async () => {
    return await axios.post('http://localhost:3000/end-round');
  }

  return { nextSong, endGame, createGame, skipRound }
}

export default useRequests;