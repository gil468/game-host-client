import { useContext } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Pause, MusicNote } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { HttpStatusCode } from "axios";
import AudioPlayer from "../../components/AudioPlayer";
import CountdownExample from "../../components/Countdown";
import { GameStatusContext } from "../../providers/GameStatusProvider";
import useGameNavigation from "../handlers/useGameNavigation";
import { skipRoundRequest, endGameRequest } from "../handlers/GameRequests";

interface GameInProgressProps {
  showCountdown : boolean,
  setShowCountdown : React.Dispatch<React.SetStateAction<boolean>>
}

const GameInProgress = ({setShowCountdown,showCountdown} : GameInProgressProps) => {
  const {gameStatus, setGameStatus} = useContext(GameStatusContext);

  const isPlaying = gameStatus === 'Running';

  const {answerRevail, endGame} = useGameNavigation();
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
        <AudioPlayer src={`http://localhost:3000/songs/${songId}.mp3`} isPlaying={isPlaying}/>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={async () => {
            const res = await skipRoundRequest();
            res.status === HttpStatusCode.Ok && 
            answerRevail(res.data)
          }}
        >
          Skip Song
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={async () => {
              const res = await endGameRequest();
              res.status === HttpStatusCode.Ok && 
              endGame(res.data)
            }}
        >
          End Game
        </Button>
        {showCountdown && <CountdownExample onEnd={() => {setGameStatus('Running'); setShowCountdown(false);}}/>}
      </Stack>
    </Stack>
  );
};

export default GameInProgress;