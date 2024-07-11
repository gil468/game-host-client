import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import GameInProgress from "../components/GameInProgress";
import MainPage from "../components/MainPage";
import AnswerPage from "../components/AnswerPage";
import EndGamePage from "../components/EndGamePage";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import GameWaitingRoom from "../components/GameWaitingRoom";
import useRelativeNavigate from "../hooks/useRelativeNavigate";

const GameRoutes = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showCountdown, setShowCountdown] = useState<boolean>(false);
    const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
    const navigate = useRelativeNavigate();

    const pinCode = useLocation().state.pinCode;
    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('round-started', (x)=> {
            navigate('game-in-progress', {state : {songId : x.songId}})
        })

        socket.on('playerJoined', (player) => {
          setWaitingPlayers(x => ([...x, player.userName]))
        })

        socket.on("buzzerGranted",() => {
            setIsPlaying(false);
            socket.on("correctAnswer", (x) => {
                enqueueSnackbar('correct answer', {variant:'success', autoHideDuration:1000,
              anchorOrigin : {horizontal : 'center', vertical : 'top'},
              onClose: () => navigate('/answer-revail', {state : {songName : x}})})
              socket.off("correctAnswer")
              socket.off("wrongAnswer")
            })
            socket.on("wrongAnswer", (x) => {
                enqueueSnackbar('wrong answer', {variant:'error', autoHideDuration:1000,
                anchorOrigin : {horizontal : 'center', vertical : 'top'},
                onClose: () => setShowCountdown(true)})
                socket.off("wrongAnswer")
                socket.off("correctAnswer")
            })
        })

        return () => {
            socket.close();
        }

    },[])

    return (
      <Routes>
        <Route path="/game-in-progress/*" element={<GameInProgress isPlaying={isPlaying} setIsPlaying={setIsPlaying}
         setShowCountdown={setShowCountdown} showCountdown={showCountdown}/>} />
        <Route path="/answer-revail/*" element={<AnswerPage/>} />
        <Route path="/end-game/*" element={<EndGamePage/>} />
        <Route path="/" element={<GameWaitingRoom joinedPlayers={waitingPlayers} pinCode={pinCode}/>}></Route>
      </Routes>
    )
}

export default GameRoutes;