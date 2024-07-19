import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameStatusContext } from '../../providers/GameStatusProvider';
import { SongProps } from '../components/GameInProgress';

const useGameNavigation = () => {
  const { setGameStatus } = useContext(GameStatusContext);
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/');
    setGameStatus('None');
  };

  const answerRevail = (songName: string) => {
    navigate('/game/answer-revail', { state: { songName: songName } });
    setGameStatus('BetweenRounds');
  };

  const endGame = (winnerName: string) => {
    navigate('/game/end-game', { state: { gameWinner: winnerName } });
    setGameStatus('Ended');
  };

  const startGame = (songProps: SongProps) => {
    navigate('/game/game-in-progress', { state: songProps });
    setGameStatus('Running');
  };

  return { backToHome, answerRevail, endGame, startGame };
};

export default useGameNavigation;
