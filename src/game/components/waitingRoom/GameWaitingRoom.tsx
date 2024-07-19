import { Box, Button, Typography, Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import { GameStatusContext } from '../../../providers/GameStatusProvider';
import { nextSongRequest } from '../../handlers/GameRequests';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';
import MainWrapper from '../../../components/MainWrapper';
import { useLocation } from 'react-router-dom';
import useGameNavigation from '../../handlers/useGameNavigation';

interface MainPageProps {
  joinedPlayers: string[];
}

const GameWaitingRoom = (props: MainPageProps) => {
  const { setGameStatus } = useContext(GameStatusContext);
  const { backToHome } = useGameNavigation();

  const state = useLocation().state;
  useEffect(() => {
    if (!state) backToHome();
  }, [state]);

  useEffect(() => setGameStatus('WaitingRoom'), []);

  return (
    <MainWrapper
      topContent={
        <Typography
          variant="h4"
          color={'info.main'}
          fontWeight={'bold'}
        >{`Pincode : ${state?.pinCode}`}</Typography>
      }
      bottomContent={
        props.joinedPlayers.length ? (
          <Stack width="95%" alignItems={'center'} spacing={3}>
            <Button
              variant="contained"
              size="large"
              // onClick={gameSettings} TO-DO: Implement GameRequests to the server
            >
              Game Settings
            </Button>
            <Button variant="contained" onClick={nextSongRequest}>
              Start Game
            </Button>
          </Stack>
        ) : (
          <></>
        )
      }
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" sx={{ paddingTop: '1rem' }}>
          Joined Players:
        </Typography>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 25%)',
            padding: '10px',
          }}
        >
          {props.joinedPlayers.map((player) => (
            <WaitingPlayerBox key={player} name={player} />
          ))}
        </div>
      </Box>
    </MainWrapper>
  );
};

export default GameWaitingRoom;
