import { useState, useEffect } from "react";
import { Button, Stack, Typography, Box, LinearProgress, Alert } from "@mui/material";
import AudioPlayer from "./AudioPlayer";
import CountdownExample from "./Countdown";
import { Pause, MusicNote } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import useRequests from "../hooks/useRequests";
import { HttpStatusCode } from "axios";
import { io } from "socket.io-client";
import useRelativeNavigate from "../hooks/useRelativeNavigate";

interface GameInProgressProps {
  isPlaying : boolean,
  setIsPlaying : React.Dispatch<React.SetStateAction<boolean>>,
  showCountdown : boolean,
  setShowCountdown : React.Dispatch<React.SetStateAction<boolean>>
}

const GameInProgress = ({isPlaying,setIsPlaying,setShowCountdown,showCountdown} : GameInProgressProps) => {
  const { endGame, skipRound } = useRequests();
  useEffect(() => setIsPlaying(true),[])

  const navigate = useRelativeNavigate();
  const songId = useLocation().state.songId;

  return (
    <Stack width="95%">
      <Stack spacing={3} alignItems={"center"}>
        <Typography variant={"h4"}>{isPlaying ? 'Song is Playing' : 'Song is Paused'}</Typography>
        <Typography variant={"h5"}>{isPlaying ? 'Someone knows?...' : 'Take a guess...'}</Typography>
      </Stack>
      {/* <AudioPlayer  src={'/wow.mp3'}/> */}
      <Stack spacing={5} alignItems={"center"}>
        <Stack spacing={1} />
        {isPlaying ? <MusicNote sx={{ fontSize: 50 }} /> : <Pause sx={{ fontSize: 50 }}/> }
        <AudioPlayer src={`http://localhost:3000/songs/${songId}.mp3`} isPlaying={isPlaying} onEnded={() => setIsPlaying(false)}/>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={async () => {
            const res = await skipRound();
            res.status === HttpStatusCode.Ok && 
            navigate('/answer-revail', {state : {songName : res.data}})
          }}
        >
          Skip Song
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={async () => {
              const res = await endGame();
              res.status === HttpStatusCode.Ok && 
              navigate('/end-game', {state : {gameWinner : res.data}})
            }}
        >
          End Game
        </Button>
        {showCountdown && <CountdownExample onEnd={() => {setIsPlaying(true); setShowCountdown(false);}}/>}
      </Stack>
    </Stack>
  );
};

export default GameInProgress;
