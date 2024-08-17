import { Button, Stack, Typography, Box } from '@mui/material';
import useGameNavigation from '../handlers/useGameNavigation';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';
import { useMemo } from 'react';
import { Fireworks } from '@fireworks-js/react';
import type { FireworksHandlers } from '@fireworks-js/react';
import { useRef } from 'react';

export interface EndGamePageProps {
  scores: ScoresProps;
}

const EndGamePage = () => {
  const scores = useBackHome<EndGamePageProps>()?.scores ?? [];

  const ref = useRef<FireworksHandlers>(null);

  // const winner = useMemo(() => {
  //   return scores
  //     ? scores.sort((a, b) => {
  //         return b.score - a.score;
  //       })[0].userName
  //     : 'No Winner';
  // }, [scores]);

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
      <Box component="img" src="../../../public/winner.svg" />
      {/* <Typography variant="h4" className="fade-in" color="white">{`${winner}`}</Typography> */}
      <Typography variant="h4" className="fade-in" color="white">
        Gil Segev
      </Typography>
      <Button variant="contained" onClick={backToHome} sx={{ width: '20vw' }}>
        Back To Main Page
      </Button>
    </Stack>
  );
};

export default EndGamePage;
