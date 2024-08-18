import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

import { styled } from '@mui/material/styles';
import { theme } from '../theme';
import { useEffect } from 'react';
import queryString from 'query-string';
import useLocalStorage from '../hooks/useLocalStorage';

const StyledButton = styled(Button)`
  ${() => `
  cursor: pointer;
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.1); /* Adjust scale as per your need */
  }
  `}
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [_, setSpotifyAccessToken] = useLocalStorage<string>(
    'spotify_access_token'
  );
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/game-manager/login';
  };

  useEffect(() => {
    const { access_token } = queryString.parse(window.location.search);
    if (access_token) {
      setSpotifyAccessToken(access_token as string);
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      // You can now use the access token in your React app
    }
  }, []);

  return (
    <Stack
      width="100%"
      alignItems={'center'}
      spacing={10}
      sx={{ marginTop: 8 }}
    >
      <StyledButton
        variant="contained"
        onClick={() => navigate('/game-creator')}
      >
        Host New Game
      </StyledButton>

      <StyledButton variant="contained" onClick={handleLogin}>
        Spotify
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
