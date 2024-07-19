import { Routes, Route, useLocation } from 'react-router-dom';
import EndGamePage from './components/EndGamePage';
import GameSettingsPage from './components/GameSettingsPage';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import useGameNavigation from './handlers/useGameNavigation';
import AnswerPage from './components/AnswerPage';
import GameInProgress, { SongProps } from './components/GameInProgress';
import GameWaitingRoom from './components/waitingRoom/GameWaitingRoom';
import addEvent from './handlers/addEvent';

const GameRoutes = () => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const { startGame, answerRevail } = useGameNavigation();

  const pinCode = useLocation().state.pinCode;

  addEvent({
    eventName: 'round-started',
    callback: (x: SongProps[]) => {
      console.log(x);
      startGame(x[0]);
    },
    newStatus: 'Running',
    stateArray: ['WaitingRoom', 'BetweenRounds'],
  });

  addEvent({
    eventName: 'playerJoined',
    callback: (player) => {
      setWaitingPlayers((x) => [...x, player[0].userName]);
    },
    newStatus: 'WaitingRoom',
    stateArray: ['WaitingRoom'],
  });

  addEvent({
    eventName: 'buzzerGranted',
    callback: () => {},
    newStatus: 'Buzzered',
    stateArray: ['Running'],
  });

  addEvent({
    eventName: 'correctAnswer',
    callback: (x) => {
      enqueueSnackbar('correct answer', {
        variant: 'success',
        autoHideDuration: 1000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () => answerRevail(x),
      });
    },
    newStatus: 'BetweenRounds',
    stateArray: ['Buzzered'],
  });

  addEvent({
    eventName: 'wrongAnswer',
    callback: () => {
      enqueueSnackbar('wrong answer', {
        variant: 'error',
        autoHideDuration: 1000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () => setShowCountdown(true),
      });
    },
    newStatus: 'BetweenRounds',
    stateArray: ['Buzzered'],
  });

  return (
    <Routes>
      <Route
        path="/game-in-progress/*"
        element={
          <GameInProgress
            setShowCountdown={setShowCountdown}
            showCountdown={showCountdown}
          />
        }
      />
      <Route path="/answer-revail/*" element={<AnswerPage />} />
      <Route path="/end-game/*" element={<EndGamePage />} />
      <Route
        path="/"
        element={
          <GameWaitingRoom joinedPlayers={waitingPlayers} pinCode={pinCode} />
        }
      ></Route>
      <Route path="/settings/" element={<GameSettingsPage />} />
    </Routes>
  );
};

export default GameRoutes;
