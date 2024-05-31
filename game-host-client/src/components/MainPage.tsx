import React from "react";
import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const launchNewGame = () => {
        // TODO: send request to start new game to server
        navigate('/game-in-progress');
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
  