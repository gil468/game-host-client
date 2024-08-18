import { useContext } from 'react';
import { SongProps } from '../components/GameInProgress';
import { socketEmit } from '../../socketIO/SocketEmits';
import { GameStatusContext } from '../../providers/GameStatusProvider';
import useGameNavigation from './useGameNavigation';
import { EndRoundResponse, ScoresProps } from '../GameInterfaces';

const useGameRequests = () => {
  const { pinCode } = useContext(GameStatusContext);
  const { endGame, answerRevail, startGame } = useGameNavigation();

  const nextSongRequest = async () => {
    return await socketEmit<SongProps>('next-round', pinCode);
  };

  const endGameRequest = async () => {
    const res = await socketEmit<{ scores: ScoresProps }>('end-game', pinCode);
    endGame(res.scores);
  };

  const endRoundRequest = async () => {
    const res = await socketEmit<EndRoundResponse>('end-round', pinCode);
    if (res) answerRevail(res.correctAnswer, res.scores);
  };

  const startRoundRequest = async (songProps: SongProps) => {
    const res = await socketEmit('start-round', pinCode);
    if (res) startGame(songProps);
  };

  return {
    nextSongRequest,
    endGameRequest,
    endRoundRequest,
    startRoundRequest,
  };
};

export default useGameRequests;
