import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createGameRequest } from '../socketIO/SocketEmits';

const MainPage = () => {
  const navigate = useNavigate();

  const launchNewGame = async () => {
    const res = await createGameRequest();
    if (res) {
      navigate('/game', { state: { pinCode: res.gameId } });
    }
  };

  return (
    <Button variant="contained" onClick={launchNewGame}>
      Host New Game
    </Button>
  );
};

export default MainPage;
