import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GameState,
  GameStatusContext,
} from '../../providers/GameStatusProvider';
import { SongProps } from '../components/GameInProgress';
import { ScoresProps, Song } from '../GameInterfaces';

const useGameNavigation = () => {
  const { setGameProps } = useContext(GameStatusContext);
  const navigate = useNavigate();

  const setGameStatus = (gameStatus: GameState) =>
    setGameProps({ gameStatus: gameStatus });

  const backToHome = () => {
    navigate('/');
    setGameStatus('None');
  };

  const answerRevail = (correctAnswer: Song, scores: ScoresProps) => {
    navigate('/game/answer-revail', {
      state: {
        songName: `${correctAnswer.title} By ${correctAnswer.artist}`,
        scores: scores,
        albumCoverUrl: correctAnswer.albumCoverUrl,
      },
    });
    setGameStatus('BetweenRounds');
  };

  const endGame = (scores: ScoresProps) => {
    navigate('/game/end-game', { state: { scores: scores } });
    setGameStatus('Ended');
  };

  const startGame = (songProps: SongProps) => {
    navigate('/game/game-in-progress', { state: songProps.previewUrl });
    setGameProps({ currRound: songProps.round });
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

  const genreSelection = () => {
    navigate('/game/genre-selection'); // TO-DO: Implement Genre Selection state
    setGameStatus('None');
  };

  return {
    backToHome,
    answerRevail,
    endGame,
    startGame,
    gameSettings,
    openLeaderboard,
    genreSelection,
  };
};

export default useGameNavigation;
