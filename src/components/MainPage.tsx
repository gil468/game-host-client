import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from "axios";
import useRequests from "../hooks/useRequests";

interface MainPageProps {
  joinedPlayers : string[]
}

const MainPage = (props : MainPageProps) => {
    const {nextSong, createGame} = useRequests();
    const [pinCode, setPinCode] = useState<number | undefined>(undefined);

    const launchNewGame = async () => {
      const res = await createGame();
      if (res.status === HttpStatusCode.Ok) setPinCode(res.data)
    };
  
  
    return (
      <Stack width="95%" alignItems={"center"} spacing={2}>
        {pinCode ?
        <>
         <Button variant="contained" size="large" onClick={nextSong}>
          Start Game
        </Button>
        <Typography variant="h4" fontWeight={'bold'}>{`Pincode : ${pinCode}`}</Typography>
        <div style={{display:'flex', gap : 4}}>{props.joinedPlayers.map(player => (
          <Typography>{player}</Typography>
        ))}</div>
        </> : <Button variant="contained" size="large" onClick={launchNewGame}>
          Host New Game
        </Button>}
      </Stack>
    );
  };
  
  export default MainPage;
  