import { Box, Button, Stack, Typography } from '@mui/material';
import useGameNavigation from '../handlers/useGameNavigation';
import { ScoresProps } from '../GameInterfaces';
import { Fireworks } from '@fireworks-js/react';
import type { FireworksHandlers } from '@fireworks-js/react';
import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import winnerSvg from '../../../public/winner.svg';

export interface EndGamePageProps {
  scores: ScoresProps;
}

const EndGamePage = () => {
  const ref = useRef<FireworksHandlers>(null);
  const scores = (useLocation().state as EndGamePageProps).scores;
  const winner = useMemo(() => {
    return scores
      ? scores.sort((a, b) => {
          return b.score - a.score;
        })[0].userName
      : 'No Winner';
  }, [scores]);

  const { backToHome } = useGameNavigation();

  return (
    <Stack width="100%" alignItems={'center'} spacing={5}>
      <Fireworks
        ref={ref}
        options={{ opacity: 0.5, acceleration: 1 }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
        }}
      />
      <Box component="img" src={winnerSvg} />
      {/* <Typography variant="h4" className="fade-in" color="white">{`${winner}`}</Typography> */}
      <Typography variant="h4" className="fade-in" color="white">
        {winner}
      </Typography>
      <Button variant="contained" onClick={backToHome} sx={{ width: '20vw' }}>
        Back To Main Page
      </Button>
    </Stack>
  );
};

export default EndGamePage;
