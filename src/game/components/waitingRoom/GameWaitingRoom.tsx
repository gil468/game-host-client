import { Box, Button, Typography, useTheme } from '@mui/material';
import { useContext, useEffect } from 'react';
import { GameStatusContext } from '../../../providers/GameStatusProvider';
import { nextSongRequest } from '../../handlers/GameRequests';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';

interface MainPageProps {
  joinedPlayers: string[];
  pinCode: number;
}

const GameWaitingRoom = (props: MainPageProps) => {
  const { setGameStatus } = useContext(GameStatusContext);

  const theme = useTheme();

  useEffect(() => setGameStatus('WaitingRoom'), []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
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
          <WaitingPlayerBox name={player} />
        ))}
      </div>
    </Box>
  );
};

export default GameWaitingRoom;
