import { Routes, Route, useLocation } from "react-router-dom";
import GameInProgress from "../components/GameInProgress";
import AnswerPage from "../components/AnswerPage";
import EndGamePage from "../components/EndGamePage";
import { enqueueSnackbar } from "notistack";
import { useState, createContext } from "react";
import GameWaitingRoom from "../components/GameWaitingRoom";
import addEvent, { GameState } from "../events/addEvent";
import GameNavigations from "../navigations/GameNavigations";

interface GameStatusContextType {
  gameStatus: GameState;
  setGameStatus: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameStatusContext = createContext<GameStatusContextType>(undefined);

const GameRoutes = () => {
  
    const [gameStatus, setGameStatus] = useState<GameState>('None');

    const [showCountdown, setShowCountdown] = useState<boolean>(false);
    const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
    const { startGame,answerRevail } = GameNavigations();
    
    const pinCode = useLocation().state.pinCode;

    const FuncAndChangeStatus = (callback: (...args: any[]) => void, newStatus : GameState) => (...args: any[]) => {
      callback(args);
      setGameStatus(newStatus)
    }

    const handleRoundStarted = (x: [{ songId: number; }])=> {
      console.log(x)
      startGame(x[0].songId)
    }
    addEvent({eventName : 'round-started', callback : FuncAndChangeStatus(handleRoundStarted, 'Running'), stateArray : ['WaitingRoom','BetweenRounds'] , gameStatus : gameStatus})

        addEvent({eventName : 'playerJoined', callback : FuncAndChangeStatus((player) => {
          console.log(player)
          setWaitingPlayers(x => ([...x, player[0].userName]))
        },'WaitingRoom'), stateArray : ['WaitingRoom'], gameStatus : gameStatus })

        addEvent({eventName : 'buzzerGranted', callback : FuncAndChangeStatus(() => {},
         'Buzzered'), stateArray : ['Running'], gameStatus : gameStatus })

         addEvent({eventName : 'correctAnswer', callback : FuncAndChangeStatus((x) => {
          enqueueSnackbar('correct answer', 
          {variant:'success', autoHideDuration:1000, anchorOrigin : {horizontal : 'center', vertical : 'top'},
            onClose: () => answerRevail(x)})},
          'BetweenRounds'), stateArray : ['Buzzered'], gameStatus : gameStatus })

         addEvent({eventName : 'wrongAnswer', callback : FuncAndChangeStatus((x) => {
          enqueueSnackbar('wrong answer', {variant:'error', autoHideDuration:1000,
          anchorOrigin : {horizontal : 'center', vertical : 'top'},
          onClose: () => setShowCountdown(true)})},
         'BetweenRounds'), stateArray : ['Buzzered'], gameStatus : gameStatus })

    return (
      <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      <Routes>
        <Route path="/game-in-progress/*" element={<GameInProgress
         setShowCountdown={setShowCountdown} showCountdown={showCountdown}/>} />
        <Route path="/answer-revail/*" element={<AnswerPage/>} />
        <Route path="/end-game/*" element={<EndGamePage/>} />
        <Route path="/" element={<GameWaitingRoom joinedPlayers={waitingPlayers} pinCode={pinCode}/>}></Route>
      </Routes>
      </GameStatusContext.Provider>
    )
}

export default GameRoutes;