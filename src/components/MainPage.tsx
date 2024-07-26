import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createGameRequest } from '../socketIO/SocketEmits';
import { TypeAnimation } from 'react-type-animation';

const MainPage = () => {
  const navigate = useNavigate();

  const launchNewGame = async () => {
    const res = await createGameRequest();
    if (res) {
      navigate('/game', { state: { pinCode: res.gameId } });
    }
  };

  return (
    <Stack
      width="100%"
      alignItems={'center'}
      spacing={10}
      sx={{ marginTop: 8 }}
    >
      <Button variant="contained" onClick={launchNewGame}>
        Host New Game
      </Button>

      <Typography variant={'h4'}>
        <TypeAnimation
          sequence={[
            'Music Master, Rock',
            1000,
            'Music Master, 80`s',
            1000,
            'Music Master, Jazz',
            1000,
            'Music Master, Hip Hop',
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
          }}
          repeat={Infinity}
        />
      </Typography>
    </Stack>
  );
};

export default MainPage;
