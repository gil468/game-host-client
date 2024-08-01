import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createGameRequest } from '../socketIO/SocketEmits';
import { TypeAnimation } from 'react-type-animation';

import { styled } from '@mui/material/styles';
import { theme } from '../theme';

const StyledButton = styled(Button)`
  ${() => `
  cursor: pointer;
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    transform: scale(1.1); /* Adjust scale as per your need */
  }
  `}
`;

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
      <StyledButton variant="contained" onClick={launchNewGame}>
        Host New Game
      </StyledButton>

      <Typography
        variant={'h4'}
        sx={{ color: theme.palette.primary.contrastText }}
      >
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
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
          }}
          repeat={Infinity}
          preRenderFirstString={true}
        />
      </Typography>
    </Stack>
  );
};

export default MainPage;
