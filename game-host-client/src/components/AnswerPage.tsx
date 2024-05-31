import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CountdownExample from "./Countdown";

export interface AnswerPageProps {
    songName : string
}

const AnswerPage = () => {
    const [showCountdown, setShowCountdown] = useState<boolean>(false); 
    const navigate = useNavigate();

    return (
        <Stack width="95%" alignItems={"center"} spacing={10}>
        <Typography variant="h3">The song is Devotion</Typography>
        <Button variant="contained" size="large" onClick={() => setShowCountdown(true)}>
          Next Song
        </Button>
        {showCountdown && <CountdownExample onEnd={() => navigate('/game-in-progress') }/>}
      </Stack>
    )
}

export default AnswerPage;