import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useRequests from "../hooks/useRequests";

export interface EndGamePageProps {
  gameWinner: string;
}

const EndGamePage = () => {
  const navigate = useNavigate();
  const gameWinner = useLocation().state.gameWinner;

  return (
    <Stack width="95%" alignItems={"center"} spacing={10}>
      <Typography variant="h3">{`${gameWinner}`}</Typography>
      <EmojiEventsIcon sx={{ fontSize: 200 }} />
      <Button variant="contained" size="large" onClick={() => navigate("/")}>
        Back To Main Page
      </Button>
    </Stack>
  );
};

export default EndGamePage;
