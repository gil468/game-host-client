import { Button, Stack, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import useGameNavigation from '../handlers/useGameNavigation';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';
import { useMemo } from 'react';

export interface EndGamePageProps {
  scores: ScoresProps;
}

const EndGamePage = () => {
  const scores = useBackHome<EndGamePageProps>()?.scores ?? [];

  const winner = useMemo(() => {
    return scores
      ? scores.sort((a, b) => {
          return b.score - a.score;
        })[0].userName
      : 'No Winner';
  }, [scores]);

  const { backToHome } = useGameNavigation();

  return (
    <Stack width="95%" alignItems={'center'} spacing={10}>
      <Typography variant="h4">{`${winner}`}</Typography>
      <EmojiEventsIcon sx={{ fontSize: 200 }} />
      <Button variant="contained" onClick={backToHome}>
        Back To Main Page
      </Button>
    </Stack>
  );
};

export default EndGamePage;
