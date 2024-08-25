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
        onClose: () => answerRevail(x.correctAnswer, x.scores),
      });
    },
    newStatus: 'BetweenRounds',
    stateArray: ['Buzzered'],
  });
  return (
    <Routes>
      <Route path="/game-in-progress" element={<GameInProgress />} />
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
