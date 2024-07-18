import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { GameStatusContext } from '../../../providers/GameStatusProvider';
import { nextSongRequest } from '../../handlers/GameRequests';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';
import MainWrapper from '../../../components/MainWrapper';

interface MainPageProps {
  joinedPlayers: string[];
  pinCode: number;
}

const GameWaitingRoom = (props: MainPageProps) => {
  const { setGameStatus } = useContext(GameStatusContext);

  useEffect(() => setGameStatus('WaitingRoom'), []);

  return (
    <MainWrapper
      topContent={
        <Typography
          variant="h4"
          color={'info.main'}
          fontWeight={'bold'}
        >{`Pincode : ${props.pinCode}`}</Typography>
      }
      bottomContent={
        props.joinedPlayers.length ? (
          <Button onClick={nextSongRequest}>Start Game</Button>
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
