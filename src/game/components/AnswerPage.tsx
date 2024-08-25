import { Stack, Typography } from '@mui/material';
import { ScoresProps } from '../GameInterfaces';
import { theme } from '../../theme';
import { useLocation } from 'react-router-dom';

export interface AnswerPageProps {
  songName: string;
  artist: string;
  albumCoverUrl: string;
  scores: ScoresProps;
}

const AnswerPage = () => {
  const state = useLocation().state as AnswerPageProps;

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      height={'100%'}
    >
      <Typography variant="h4" fontSize={'1.8rem'}>
        The song was:
      </Typography>
      <Stack alignItems={'center'} spacing={2}>
        <img
          src={state?.albumCoverUrl}
          style={{
            width: '13rem',
            height: '13rem',
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
