import { Box, Button, Typography, Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import { GameStatusContext } from '../../../providers/GameStatusProvider';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';
import MainWrapper from '../../../components/MainWrapper';
import useBackHome from '../../../hooks/useBackHome';
import useGameRequests from '../../handlers/useGameRequests';

interface MainPageProps {
  joinedPlayers: string[];
}

const GameWaitingRoom = (props: MainPageProps) => {
  const { setGameStatus, setPinCode, pinCode } = useContext(GameStatusContext);
  const { nextSongRequest, startRoundRequest } = useGameRequests();

  const state = useBackHome<{ pinCode: number }>();

  useEffect(() => {
    setGameStatus('WaitingRoom');
    setPinCode(state?.pinCode);
  }, []);

  return (
    <MainWrapper
      topContent={
        <Typography
          variant="h4"
          color={'info.main'}
          fontWeight={'bold'}
        >{`Pincode : ${pinCode}`}</Typography>
      }
      bottomContent={
        true ? (
          <Stack width="95%" alignItems={'center'} spacing={3}>
            <Button
              variant="contained"
              size="large"
              // onClick={gameSettings} TO-DO: Implement GameRequests to the server
            >
              Game Settings
            </Button>
            {props.joinedPlayers.length > 0 && (
              <Button
                variant="contained"
                onClick={async () => {
                  await startRoundRequest(await nextSongRequest());
                }}
              >
                Start Game
              </Button>
            )}
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
