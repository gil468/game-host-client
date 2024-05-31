import { useState, useEffect } from "react";
import { Button, Stack, Typography, Box, LinearProgress, Alert } from "@mui/material";
import AudioPlayer from "./AudioPlayer";
import CountdownExample from "./Countdown";
import { Pause, MusicNote } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const GameInProgress = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const { enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();

  const launchNewGame = () => {
    // TODO: send request to start new game to server
  };

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
        <AudioPlayer src="/devotion.mp3" isPlaying={isPlaying} onEnded={() => setIsPlaying(false)}/>
        {isPlaying  ? <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => setIsPlaying(false)}
        >
          Pause
        </Button> : <div>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={() => enqueueSnackbar('wrong answer', {variant:'error', autoHideDuration:1000,
           anchorOrigin : {horizontal : 'center', vertical : 'top'},
           onClose: () => setShowCountdown(true)})}
        >
          Wrong Answer
        </Button>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => enqueueSnackbar('correct answer', {variant:'success', autoHideDuration:1000,
          anchorOrigin : {horizontal : 'center', vertical : 'top'},
          onClose: () => navigate('/answer-revail', {state : {songName : 'Devotion'}})})}
        >
          Correct Answer
        </Button>
        </div>}
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => navigate('/answer-revail', {state : {songName : 'Devotion'}})}
        >
          Skip Song
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={launchNewGame}
        >
          End Game
        </Button>
        {showCountdown && <CountdownExample onEnd={() => {setIsPlaying(true); setShowCountdown(false);}}/>}
      </Stack>
    </Stack>
  );
};

export default GameInProgress;
