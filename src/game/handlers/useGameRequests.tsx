import { SongProps } from '../components/GameInProgress';
import { socketEmit } from '../../socketIO/SocketEmits';
import useGameNavigation from './useGameNavigation';
import { EndRoundResponse, RejoinResponse, ScoresProps } from '../GameInterfaces';
import useLocalStorage from '../../hooks/useLocalStorage';

const useGameRequests = () => {
  const [pinCode] = useLocalStorage<number>('pinCode');
  const { endGame, answerRevail, startGame } = useGameNavigation();
  const [gameSecret] = useLocalStorage('gameSecret');

  const nextSongRequest = async () => {
    return await socketEmit<SongProps>('next-round', pinCode);
  };

  const endGameRequest = async () => {
    const res = await socketEmit<{ scores: ScoresProps }>('end-game', pinCode);
    endGame(res.scores);
  };

  const endRoundRequest = async () => {
    const res = await socketEmit<EndRoundResponse>('end-round', pinCode);
    debugger;
    if (res) answerRevail(res.correctAnswer, res.scores);
  };

  const startRoundRequest = async (songProps: SongProps) => {
    const res = await socketEmit('start-round', pinCode);
    if (res) startGame(songProps);
  };

  const rejoinGameRequest = async () => {
    return await socketEmit<RejoinResponse>('rejoin-game', undefined, {gameSecret : gameSecret, gameId : pinCode});
  };

  return {
    nextSongRequest,
    endGameRequest,
    endRoundRequest,
    startRoundRequest,
    rejoinGameRequest
  };
};

export default useGameRequests;
