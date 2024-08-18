import { Stack, Typography } from '@mui/material';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';
import { theme } from '../../theme';

export interface AnswerPageProps {
  songName: string;
  albumCoverUrl: string;
  scores: ScoresProps;
}

const AnswerPage = () => {
  const state = useBackHome<AnswerPageProps>();

  return (
    <Stack width="100%" alignItems={'center'}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        spacing={8}
        sx={{ padding: '4rem' }}
      >
        <Typography variant="h3">The song is</Typography>
        <Typography
          variant="h2"
          sx={{ color: theme.palette.primary.main }}
        >{`${state?.songName}`}</Typography>
        <img
          src={state?.albumCoverUrl}
          style={{
            width: '18rem',
            height: '18rem',
            borderRadius: '2%',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AnswerPage;
