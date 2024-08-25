import { SongProps } from '../components/GameInProgress';
import { socketEmit } from '../../socketIO/SocketEmits';
import useGameNavigation from './useGameNavigation';
import {
  EndRoundResponse,
  RejoinResponse,
  ScoresProps,
} from '../GameInterfaces';
import useLocalStorage from '../../hooks/useLocalStorage';
import { GameCreationProps } from '../components/GameCreatorPage';
import { useParams } from 'react-router-dom';

const useGameRequests = () => {
  const [pinCode] = useLocalStorage<number>('pinCode');
  const { endGame, answerRevail, startGame, createGame } = useGameNavigation();
  const [gameSecret] = useLocalStorage('gameSecret');
  const { gameId } = useParams();

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

  const rejoinGameRequest = async () => {
    return await socketEmit<RejoinResponse>('rejoin-game', undefined, {
      gameSecret: gameSecret,
      gameId: gameId,
    });
  };

  const createGameRequest = async (gameSettings: GameCreationProps) => {
    const res = await socketEmit<{ gameId: string; gameSecret: string }>(
      'create-game',
      undefined,
      gameSettings
    );
    createGame(res.gameId, gameSettings.totalRounds, res.gameSecret);
  };

  return {
    createGameRequest,
    nextSongRequest,
    endGameRequest,
    endRoundRequest,
    startRoundRequest,
    rejoinGameRequest,
  };
};

export default useGameRequests;
