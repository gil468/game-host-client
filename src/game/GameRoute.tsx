import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EndGamePage from './components/EndGamePage';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import useGameNavigation from './handlers/useGameNavigation';
import GameInProgress from './components/GameInProgress';
import GameWaitingRoom from './components/waitingRoom/GameWaitingRoom';
import addEvent from './handlers/addEvent';
import { BuzzerRevokedProps, EndRoundResponse } from './GameInterfaces';
import RoundResultsPage from './components/RoundResultsPage';
import { GameStatusContext } from '../providers/GameStatusProvider';
import useGameRequests from './handlers/useGameRequests';
import useLocalStorage from '../hooks/useLocalStorage';

const GameRoutes = () => {
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const { answerRevail } = useGameNavigation();
  const { rejoinGameRequest } = useGameRequests();
  const { gameProps, setGameProps } = useContext(GameStatusContext);
  const [__, setGameSecret] = useLocalStorage('gameSecret');

  const state = useLocation().state as { pinCode: number; rounds: number }

  useEffect(() => {
    const rejoinGame = async () => {
    console.log('in rejoin`')
    const res = await rejoinGameRequest();
    console.log(res)
    setGameProps({
      currRound : res.round,
      gameRounds : res.totalRounds,
      pinCode : res.gameId,
      gameStatus : res.gameStatus === 'CREATED' ? 'WaitingRoom' : (res.gameStatus === 'PENDING_ROUND_START' ?
        'BetweenRounds' : (res.gameStatus === 'ROUND_IN_PROGRESS'? 'Running': (res.gameStatus === 'ROUND_ENDED') ? 'BetweenRounds': 'None')
      )
    })
     setGameSecret(res.gameSecret)
     setWaitingPlayers(Object.values(res.gamePlayers).map(x => x.userName))
    }
    setGameProps({
      pinCode: state?.pinCode,
      gameRounds: state?.rounds,
    });
    if(gameProps?.gameStatus === undefined){
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

export default GameRoutes;
