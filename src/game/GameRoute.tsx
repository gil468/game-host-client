import { Routes, Route, Navigate } from 'react-router-dom';
import EndGamePage from './components/EndGamePage';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import useGameNavigation from './handlers/useGameNavigation';
import GameInProgress from './components/GameInProgress';
import GameWaitingRoom from './components/waitingRoom/GameWaitingRoom';
import addEvent from './handlers/addEvent';
import { BuzzerRevokedProps, EndRoundResponse } from './GameInterfaces';
import RoundResultsPage from './components/RoundResultsPage';

const GameRoutes = () => {
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const [guessingPlayer, setGuessingPlayer] = useState<string>();
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
    callback: (player) => {
      setGuessingPlayer(player.playerName);
    },
    newStatus: 'Buzzered',
    stateArray: ['Running'],
  });

  addEvent({
    eventName: 'buzzer-revoked',
    callback: (answerResponse: BuzzerRevokedProps) => {
      setGuessingPlayer(undefined);
      const halfAnswer = answerResponse.artist || answerResponse.title;
      const message = halfAnswer
        ? `${answerResponse.answeredBy} guessed the ${answerResponse.artist ? 'artist' : 'title'} of the song`
        : `wrong answer by ${answerResponse.answeredBy}`;
      enqueueSnackbar(message, {
        variant: halfAnswer ? 'success' : 'error',
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
    },
    newStatus: 'Running',
    stateArray: ['Buzzered'],
  });

  // Tell Oren to change the array that sent back
  addEvent({
    eventName: 'round-ended',
    callback: (x: EndRoundResponse) => {
      setGuessingPlayer(undefined);
      enqueueSnackbar('correct answer', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () => answerRevail(x.correctAnswer, x.scores),
      });
    },
    newStatus: 'BetweenRounds',
    stateArray: ['Buzzered'],
  });

  return (
    <Routes>
      <Route
        path="/game-in-progress"
        element={<GameInProgress guessingPlayer={guessingPlayer} />}
      />
      <Route path="/answer-revail" element={<RoundResultsPage />} />
      <Route path="/end-game" element={<EndGamePage />} />
      <Route
        path="/"
        element={<GameWaitingRoom joinedPlayers={waitingPlayers} />}
      ></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default GameRoutes;
