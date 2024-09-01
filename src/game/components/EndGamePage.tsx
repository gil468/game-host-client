import { Box, Button, Stack, Typography } from '@mui/material';
import useGameNavigation from '../handlers/useGameNavigation';
import { ScoresProps } from '../GameInterfaces';
import { Fireworks } from '@fireworks-js/react';
import type { FireworksHandlers } from '@fireworks-js/react';
import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import winnerSvg from '../../../public/winner.svg';
import Avatar, { genConfig } from 'react-nice-avatar';
import MainWrapper from '../../components/MainWrapper';
import GameLeaderboardPage from './GameLeaderboardPage';

export interface EndGamePageProps {
  scores: ScoresProps;
}

const EndGamePage = () => {
  const ref = useRef<FireworksHandlers>(null);
  const scores = (useLocation().state as EndGamePageProps)?.scores;
  const winner = useMemo(() => {
    return scores
      ? scores.sort((a, b) => {
          return b.score - a.score;
        })[0]?.userName
      : 'No Winner';
  }, [scores]);

  const { backToHome } = useGameNavigation();

  return (
    <Stack>
      <Fireworks
          ref={ref}
          options={{ opacity: 0.5, acceleration: 1, mouse : {click : true, move : true, max  :5} }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed'
          }}
          
        />
      <MainWrapper
        topContent={
          <Stack
            sx={{ placeContent: 'center' }}
            className="fade-in"
            direction={'row'}
            gap={2}
            alignItems={'center'}
          >
            <Box component="img" src={winnerSvg} sx={{ width: '10%' }} />
            <Typography variant="h4" color="white">{`Winner : `}</Typography>
            <Avatar
              style={{ width: '3rem', height: '3rem' }}
              {...genConfig(winner)}
            />
            <Typography variant="h4" color="white">
              {winner}
            </Typography>
          </Stack>
        }
        bottomContent={
          <Button
            variant="contained"
            onClick={backToHome}
            sx={{ width: '20vw' }}
          >
            Back To Main Page
          </Button>
        }
        mainComponenetProps={{
          sx: { display: 'flex', flexDirection: 'column', overflowY: 'auto' },
        }}
      >
        <GameLeaderboardPage scores={scores} />
      </MainWrapper>
    </Stack>
  );
};

export default EndGamePage;
