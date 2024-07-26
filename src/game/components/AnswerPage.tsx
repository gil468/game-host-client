import { Button, Stack, Typography } from '@mui/material';
import MainWrapper from '../../components/MainWrapper';
import useGameNavigation from '../handlers/useGameNavigation';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';

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
      <Stack width="95%" alignItems={'center'} spacing={10}>
        <Typography variant="h3">{`The song is ${state?.songName}`}</Typography>
      </Stack>
    </MainWrapper>
  );
};

export default AnswerPage;
