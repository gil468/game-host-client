import { Box, Button, Typography } from '@mui/material';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';
import MainWrapper from '../../../components/MainWrapper';
import useGameRequests from '../../handlers/useGameRequests';
import { useParams } from 'react-router-dom';

interface MainPageProps {
  joinedPlayers: string[];
}

const GameWaitingRoom = (props: MainPageProps) => {
  const { startRoundRequest, nextSongRequest } = useGameRequests();
  const handleStartGame = async () => {
    await startRoundRequest(await nextSongRequest());
  };
  const { gameId } = useParams();

  return (
    <MainWrapper
      topContent={
        <Typography
          variant="h4"
          color={'info.main'}
          fontWeight={'bold'}
        >{`Pincode : ${gameId}`}</Typography>
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
            gridTemplateColumns: 'repeat(auto-fill, 50%)',
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
