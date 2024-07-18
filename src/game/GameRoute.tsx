import { Routes, Route, useLocation } from 'react-router-dom';
import EndGamePage from './components/EndGamePage';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import useGameNavigation from './handlers/useGameNavigation';
import AnswerPage from './components/AnswerPage';
import GameInProgress from './components/GameInProgress';
import GameWaitingRoom from './components/waitingRoom/GameWaitingRoom';
import addEvent from './handlers/addEvent';
import { Button, Paper, Typography, useTheme } from '@mui/material';
import MainWrapper from '../components/MainWrapper';
import { nextSongRequest } from './handlers/GameRequests';

const GameRoutes = () => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const { startGame, answerRevail } = useGameNavigation();

  const pinCode = useLocation().state.pinCode;

  const theme = useTheme();

  addEvent({
    eventName: 'round-started',
    callback: (x: [{ songId: number }]) => startGame(x[0].songId),
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
    callback: (x) => {
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
          <MainWrapper
            topContent={
              <Typography
                color={theme.palette.text.primary}
                variant="h4"
                fontWeight={'bold'}
              >{`Pincode : ${pinCode}`}</Typography>
            }
            bottomContent={
              waitingPlayers.length ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={nextSongRequest}
                >
                  Start Game
                </Button>
              ) : (
                <></>
              )
            }
          >
            <GameWaitingRoom joinedPlayers={waitingPlayers} pinCode={pinCode} />
          </MainWrapper>
        }
      ></Route>
    </Routes>
  );
};

export default GameRoutes;
