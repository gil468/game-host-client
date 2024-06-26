import React, { useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from "axios";
import useSocket from "../hooks/useSocket";
import useRequests from "../hooks/useRequests";

const MainPage = () => {
    useSocket();
    const {nextSong, createGame} = useRequests();

    const launchNewGame = async () => {
        // TODO: send request to start new game to server
        const createGameRes = await createGame();
        if (createGameRes.status === HttpStatusCode.Ok)
        {
          nextSong();
        }
    };
  
    return (
      <Stack width="95%" alignItems={"center"} spacing={10}>
        <Button variant="contained" size="large" onClick={launchNewGame}>
          Host New Game
        </Button>
      </Stack>
    );
  };
  
  export default MainPage;
  