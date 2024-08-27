import { Routes, Route, Navigate } from 'react-router-dom';
import EndGamePage from '../components/EndGamePage';
import GameInProgress from '../components/GameInProgress';
import RoundResultsPage from '../components/RoundResultsPage';
import GameWaitingRoom from '../components/waitingRoom/GameWaitingRoom';
import { enqueueSnackbar } from 'notistack';
import { useState, useContext, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  GameState,
  GameStatusContext,
} from '../../providers/GameStatusProvider';
import { BuzzerRevokedProps, EndRoundResponse } from '../GameInterfaces';
import addEvent from '../handlers/addEvent';
import useGameNavigation from '../handlers/useGameNavigation';
import useGameRequests from '../handlers/useGameRequests';

const InGameRoute = () => {
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const [guessingPlayer, setGuessingPlayer] = useState<string>();
  const { answerRevail } = useGameNavigation();
  const { rejoinGameRequest } = useGameRequests();
  const { setGameProps } = useContext(GameStatusContext);
  const [__, setGameSecret] = useLocalStorage('gameSecret');
  const [navigationEntry] = performance.getEntriesByType('navigation');

  const rejoinStatusToGameStatus: Record<string, GameState> = {
    CREATED: 'WaitingRoom',
    PENDING_ROUND_START: 'BetweenRounds',
    ROUND_IN_PROGRESS: 'Running',
    ROUND_ENDED: 'BetweenRounds',
  };

  useEffect(() => {
    const rejoinGame = async () => {
      const res = await rejoinGameRequest();
      setGameProps({
        currRound: res.round,
        gameRounds: res.totalRounds,
        gameStatus: rejoinStatusToGameStatus[res.gameStatus] ?? 'None',
      });
      setGameSecret(res.gameSecret);
      setWaitingPlayers(Object.values(res.gamePlayers).map((x) => x.userName));
    };

    if ((navigationEntry as PerformanceNavigationTiming).type === 'reload') {
      rejoinGame();
    }
  }, []);

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

  addEvent({
    eventName: 'round-ended',
    callback: (x: EndRoundResponse) => {
      enqueueSnackbar('correct answer', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        onClose: () => {
          answerRevail(x.correctAnswer, x.scores);
          setGuessingPlayer(undefined);
        },
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

export default InGameRoute;
