import { Routes, Route, Navigate } from 'react-router-dom';
import EndGamePage from './components/EndGamePage';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import useGameNavigation from './handlers/useGameNavigation';
import AnswerPage from './components/AnswerPage';
import GameInProgress from './components/GameInProgress';
import GameWaitingRoom from './components/waitingRoom/GameWaitingRoom';
import addEvent from './handlers/addEvent';
import GameLeaderboardPage from './components/GameLeaderboardPage';
import { BuzzerRevokedProps, EndRoundResponse } from './GameInterfaces';

const GameRoutes = () => {
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const { answerRevail } = useGameNavigation();

  addEvent({
    eventName: 'player-joined',
    callback: (player) => {
      setWaitingPlayers((x) => [...x, player.userName]);
    },
    newStatus: 'WaitingRoom',
    stateArray: ['WaitingRoom'],
  });

  addEvent({
    eventName: 'buzzer-granted',
    callback: () => {},
    newStatus: 'Buzzered',
    stateArray: ['Running'],
  });

  addEvent({
    eventName: 'buzzer-revoked',
    callback: (answerResponse: BuzzerRevokedProps) => {
      const halfAnswer = answerResponse.artist || answerResponse.title;
      enqueueSnackbar(
        `${halfAnswer ? 'half' : 'wrong'} answer by ${answerResponse.answeredBy} ${answerResponse.artist ?? answerResponse.title ?? ''}`,
        {
          variant: 'error',
          autoHideDuration: 1000,
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        }
      );
    },
    newStatus: 'Running',
    stateArray: ['Buzzered'],
  });

  // Tell Oren to change the array that sent back
  addEvent({
    eventName: 'round-ended',
    callback: (x: EndRoundResponse) => {
      enqueueSnackbar('correct answer', {
        variant: 'success',
        autoHideDuration: 1000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () =>
          answerRevail(
            `${x.correctAnswer.title} By ${x.correctAnswer.artist}`,
            x.scores
          ),
      });
    },
    newStatus: 'BetweenRounds',
    stateArray: ['Buzzered'],
  });

  return (
    <Routes>
      <Route path="/game-in-progress" element={<GameInProgress />} />
      <Route path="/answer-revail" element={<AnswerPage />} />
      <Route path="/end-game" element={<EndGamePage />} />
      <Route
        path="/"
        element={<GameWaitingRoom joinedPlayers={waitingPlayers} />}
      ></Route>
      <Route path="/leaderboard" element={<GameLeaderboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default GameRoutes;
