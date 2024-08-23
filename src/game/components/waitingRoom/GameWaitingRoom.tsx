import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { GameStatusContext } from '../../../providers/GameStatusProvider';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';
import MainWrapper from '../../../components/MainWrapper';
import useGameRequests from '../../handlers/useGameRequests';

interface MainPageProps {
  joinedPlayers: string[];
}

const GameWaitingRoom = (props: MainPageProps) => {
  const { gameProps, setGameProps } = useContext(GameStatusContext);
  const { startRoundRequest, nextSongRequest } = useGameRequests();

  useEffect(() => {
    setGameProps({
      gameStatus: 'WaitingRoom'
    });
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
        >{`Pincode : ${gameProps?.pinCode}`}</Typography>
      }
      bottomContent={
        <Button
          variant="contained"
          size="large"
          disabled={!props.joinedPlayers.length}
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
