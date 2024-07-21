import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameStatusContext } from '../../providers/GameStatusProvider';
import { SongProps } from '../components/GameInProgress';
import { ScoresProps } from '../GameInterfaces';

const useGameNavigation = () => {
  const { setGameStatus } = useContext(GameStatusContext);
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/');
    setGameStatus('None');
  };

  const answerRevail = (songName: string, scores: ScoresProps) => {
    navigate('/game/answer-revail', {
      state: { songName: songName, scores: scores },
    });
    setGameStatus('BetweenRounds');
  };

  const endGame = (scores: ScoresProps) => {
    navigate('/game/end-game', { state: { scores: scores } });
    setGameStatus('Ended');
  };

  const startGame = (songProps: SongProps) => {
    navigate('/game/game-in-progress', { state: songProps });
    setGameStatus('Running');
  };

  const gameSettings = () => {
    navigate('/game/settings');
    setGameStatus('None');
  };

  const openLeaderboard = (scores: ScoresProps) => {
    navigate('/game/leaderboard', { state: { scores: scores } });
    setGameStatus('BetweenRounds');
  };

  return {
    backToHome,
    answerRevail,
    endGame,
    startGame,
    gameSettings,
    openLeaderboard,
  };
};

export default useGameNavigation;
