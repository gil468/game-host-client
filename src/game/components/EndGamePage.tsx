import { Button, Stack, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import useGameNavigation from '../handlers/useGameNavigation';
import useBackHome from '../../hooks/useBackHome';

export interface EndGamePageProps {
  gameWinner: string;
}

const EndGamePage = () => {
  const gameWinner = useBackHome<EndGamePageProps>()?.gameWinner;

  const { backToHome } = useGameNavigation();

  return (
    <Stack width="95%" alignItems={'center'} spacing={10}>
      <Typography variant="h4">{`${gameWinner}`}</Typography>
      <EmojiEventsIcon sx={{ fontSize: 200 }} />
      <Button variant="contained" onClick={backToHome}>
        Back To Main Page
      </Button>
    </Stack>
  );
};

export default EndGamePage;
