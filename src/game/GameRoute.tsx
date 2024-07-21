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
    callback: () => {
      enqueueSnackbar('wrong answer', {
        variant: 'error',
        autoHideDuration: 1000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
    },
    newStatus: 'Running',
    stateArray: ['Buzzered'],
  });

  // Ask Oren to send back the correct answer
  addEvent({
    eventName: 'round-ended',
    callback: (x) => {
      enqueueSnackbar('correct answer', {
        variant: 'success',
        autoHideDuration: 1000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () => answerRevail(`${x.correctAnswer.title} By ${x.correctAnswer.artist}`),
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
      <Route
        path="/leaderboard"
        element={
          <GameLeaderboardPage
            players={waitingPlayers.map((x, index) => ({
              name: x,
              score: (index + 1) * 10,
            }))}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default GameRoutes;
