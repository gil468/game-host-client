import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CountdownExample from "./Countdown";
import useRequests from "../hooks/useRequests";

export interface AnswerPageProps {
    songName : string
}

const AnswerPage = () => {
    const [showCountdown, setShowCountdown] = useState<boolean>(false); 
    const { nextSong } = useRequests();
    const songName = useLocation().state.songName;

    return (
        <Stack width="95%" alignItems={"center"} spacing={10}>
        <Typography variant="h3">{`The song is ${songName}`}</Typography>
        <Button variant="contained" size="large" onClick={() => setShowCountdown(true)}>
          Next Song
        </Button>
        {showCountdown && <CountdownExample onEnd={nextSong}/>}
      </Stack>
    )
}

export default AnswerPage;