import React, { useState, useEffect } from "react";
import { Button, Stack, Typography, Box, LinearProgress } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const GameInProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 0.5 * 10; // 5% increase
        return Math.min(oldProgress + diff, 100);
      });
    }, 500); // In total, increase 5% per half a second

    return () => {
      clearInterval(timer);
    };
  }, []);

  const launchNewGame = () => {
    // TODO: send request to start new game to server
  };

  return (
    <Stack width="95%">
      <Stack spacing={3} alignItems={"center"}>
        <Typography variant={"h1"}>Music Master</Typography>
        <Typography variant={"h4"}>Song is Playing</Typography>
        <Typography variant={"h5"}>Take a guess...</Typography>
      </Stack>

      <Stack spacing={5} alignItems={"center"}>
        <Stack spacing={1} />
        <MusicNoteIcon sx={{ fontSize: 50 }} />
        <Box sx={{ width: "25%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>

        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={launchNewGame}
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
      </Stack>
    </Stack>
  );
};

export default GameInProgress;
