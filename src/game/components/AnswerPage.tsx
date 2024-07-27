import { Button, Stack, Typography } from '@mui/material';
import MainWrapper from '../../components/MainWrapper';
import useGameNavigation from '../handlers/useGameNavigation';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';
import { Height } from '@mui/icons-material';

export interface AnswerPageProps {
  songName: string;
  scores: ScoresProps;
}

const AnswerPage = () => {
  const state = useBackHome<AnswerPageProps>();
  const { openLeaderboard } = useGameNavigation();

  return (
    <MainWrapper
      bottomContent={
        <Button
          variant="contained"
          onClick={() => openLeaderboard(state?.scores ?? [])}
        >
          Show Leaderboard
        </Button>
      }
    >
      <Stack width="100%" alignItems={'center'} spacing={10}>
        <Typography variant="h3">{`The song is ${state?.songName}`}</Typography>
        <img
          src="/public/album-cover.jpg"
          style={{ width: '200px', height: '200px' }}
        />
      </Stack>
    </MainWrapper>
  );
};

export default AnswerPage;
