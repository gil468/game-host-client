import { Button, Stack, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useLocation } from 'react-router-dom';
import useGameNavigation from '../handlers/useGameNavigation';

export interface EndGamePageProps {
  gameWinner: string;
}

const EndGamePage = () => {
  const gameWinner = useLocation().state.gameWinner;

  const { backToHome } = useGameNavigation();

  return (
    <Stack width="95%" alignItems={'center'} spacing={10}>
      <Typography variant="h4">{`${gameWinner}`}</Typography>
      <EmojiEventsIcon sx={{ fontSize: 200 }} />
      <Button onClick={backToHome}>Back To Main Page</Button>
    </Stack>
  );
};

export default EndGamePage;
