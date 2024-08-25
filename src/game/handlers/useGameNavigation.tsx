import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GameState,
  GameStatusContext,
} from '../../providers/GameStatusProvider';
import { SongProps } from '../components/GameInProgress';
import { ScoresProps, Song } from '../GameInterfaces';
import useLocalStorage from '../../hooks/useLocalStorage';

const useGameNavigation = () => {
  const { setGameProps } = useContext(GameStatusContext);
  const navigate = useNavigate();
  const [_, setGameSecret] = useLocalStorage('gameSecret');
  const { gameId } = useParams();

  const setGameStatus = (gameStatus: GameState) =>
    setGameProps({ gameStatus: gameStatus });

  const createGame = (
    pinCode: string,
    totalRounds: number,
    gameSecret: string
  ) => {
    setGameProps({
      gameRounds: totalRounds,
      gameStatus: 'WaitingRoom',
    });
    setGameSecret(gameSecret);
    navigate(`/game/${pinCode}`);
  };

  const startGame = (songProps: SongProps) => {
    navigate(`/game/${gameId}/game-in-progress`, {
      state: songProps.previewUrl,
    });
    setGameProps({ currRound: songProps.round });
    setGameStatus('Running');
  };

  const answerRevail = (correctAnswer: Song, scores: ScoresProps) => {
    navigate(`../answer-revail`, {
      state: {
        songName: `${correctAnswer.title} By ${correctAnswer.artist}`,
        scores: scores,
        albumCoverUrl: correctAnswer.albumCoverUrl,
      },
    });
    setGameStatus('BetweenRounds');
  };

  const endGame = (scores: ScoresProps) => {
    navigate('../end-game', { state: { scores: scores } });
    setGameStatus('Ended');
  };

  const backToHome = () => {
    navigate('/');
    setGameStatus('None');
  };

  return {
    createGame,
    answerRevail,
    endGame,
    startGame,
    backToHome,
  };
};

export default useGameNavigation;
