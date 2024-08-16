import { Box, Button, Typography } from '@mui/material';
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
  const { startRoundRequest, nextSongRequest } = useGameRequests();

  const state = useBackHome<{ pinCode: number }>();

  useEffect(() => {
    setGameStatus('WaitingRoom');
    setPinCode(state?.pinCode);
  }, []);

  const handleStartGame = async () => {
    await startRoundRequest(await nextSongRequest());
  };

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
        <Button
          variant="contained"
          size="large"
          onClick={handleStartGame} // TO-DO: Implement GameRequests to the server
        >
          Start Game
        </Button>
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
