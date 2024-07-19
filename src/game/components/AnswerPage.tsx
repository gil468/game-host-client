import { Button, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MainWrapper from '../../components/MainWrapper';
import useGameNavigation from '../handlers/useGameNavigation';

export interface AnswerPageProps {
  songName: string;
}

const AnswerPage = () => {
  const songName = useLocation().state.songName;
  const { openLeaderboard } = useGameNavigation();

  return (
    <MainWrapper
      bottomContent={
        <Button variant="contained" onClick={openLeaderboard}>
          Show Leaderboard
        </Button>
      }
    >
      <Stack width="95%" alignItems={'center'} spacing={10}>
        <Typography variant="h3">{`The song is ${songName}`}</Typography>
      </Stack>
    </MainWrapper>
  );
};

export default AnswerPage;
