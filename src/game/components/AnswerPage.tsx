import { Stack, Typography } from '@mui/material';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';
import { theme } from '../../theme';

export interface AnswerPageProps {
  songName: string;
  artist: string;
  albumCoverUrl: string;
  scores: ScoresProps;
}

const AnswerPage = () => {
  const state = useBackHome<AnswerPageProps>();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      height={'100%'}
    >
      <Typography variant="h4" fontSize={'2.2rem'}>
        The song was:
      </Typography>
      <Stack alignItems={'center'} spacing={2}>
        <img
          src={state?.albumCoverUrl}
          style={{
            width: '15rem',
            height: '15rem',
            borderRadius: '2%',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
          }}
        />
        <Stack>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.main }}
          >{`${state?.songName}`}</Typography>
          <Typography
            variant="h4"
            sx={{ color: theme.palette.secondary.main }}
          >{`${state?.artist}`}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AnswerPage;
