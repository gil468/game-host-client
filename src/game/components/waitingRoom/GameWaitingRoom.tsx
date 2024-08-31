import { Box, Button, Stack, Typography } from '@mui/material';
import './GameWaitingRoom.css';
import WaitingPlayerBox from './WaitingPlayerBox';
import MainWrapper from '../../../components/MainWrapper';
import useGameRequests from '../../handlers/useGameRequests';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

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
        <Stack
          paddingTop={2}
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={4}
        >
          <Typography
            variant="h4"
            color={'info.main'}
            fontWeight={'bold'}
          >{`Pincode : ${gameId}`}</Typography>
          <Stack boxShadow={'0px 4px 8px'} border={'1px solid white'}>
            <QRCodeSVG
              value={`${import.meta.env.VITE_PLAYER_CLIENT_URL}?gameId=${gameId}`}
            />
          </Stack>
        </Stack>
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
            gridTemplateColumns: 'repeat(auto-fill, 40%)',
            width: '100%',
            paddingLeft: '5%',
            paddingTop: '2rem',
            gap: '10%',
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
