import { Routes, Route, Navigate } from 'react-router-dom';
import EndGamePage from './components/EndGamePage';
import GameSettingsPage from './components/GameSettingsPage';
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

  // //remove
  // addEvent({
  //   eventName: 'round-started',
  //   callback: (x: SongProps[]) => {
  //     console.log(x)
  //     startGame(x[0]);
  //   },
  //   newStatus: 'Running',
  //   stateArray: ['WaitingRoom', 'BetweenRounds'],
  // });

  addEvent({
    eventName: 'player-joined',
    callback: (player) => {
      setWaitingPlayers((x) => [...x, player[0].userName]);
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
    callback: (answerResponse: BuzzerRevokedProps[]) => {
      const halfAnswer = answerResponse[0].artist || answerResponse[0].title;
      enqueueSnackbar(
        `${halfAnswer ? 'half' : 'wrong'} answer by ${answerResponse[0].answeredBy} ${answerResponse[0].artist ?? answerResponse[0].title ?? ''}`,
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
    callback: (x: EndRoundResponse[]) => {
      enqueueSnackbar('correct answer', {
        variant: 'success',
        autoHideDuration: 1000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () =>
          answerRevail(
            `${x[0].correctAnswer.title} By ${x[0].correctAnswer.artist}`,
            x[0].scores
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
      <Route path="/settings" element={<GameSettingsPage />} />
      <Route path="/leaderboard" element={<GameLeaderboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default GameRoutes;
