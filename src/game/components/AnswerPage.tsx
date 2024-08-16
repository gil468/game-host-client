import { Button, Stack, Typography } from '@mui/material';
import MainWrapper from '../../components/MainWrapper';
import useGameNavigation from '../handlers/useGameNavigation';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';
import { theme } from '../../theme';

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
          sx={{ width: '20vw' }}
        >
          Show Leaderboard
        </Button>
      }
    >
      <Stack width="100%" alignItems={'center'}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          spacing={8}
        >
          <Typography variant="h3">The song is</Typography>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.main }}
          >{`${state?.songName}`}</Typography>
          <img
            src="/public/album-cover.jpg"
            style={{
              width: '12vw',
              height: '22vh',
              borderRadius: '2%',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
            }}
          />
        </Stack>
      </Stack>
    </MainWrapper>
  );
};

export default AnswerPage;
