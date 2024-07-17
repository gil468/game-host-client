import {
  Stack,
  Typography,
  Paper,
  Box,
  TextField,
  Switch,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import './GameSettingsPage.css';

const GameSettingsPage = () => {
  // const navigate = useNavigate();
  const [numberOfRounds, setNumberOfRounds] = useState<number>(10);
  const [timePerSong, setTimePerSong] = useState<number>(5);
  const [bonusPointsEnabled, setBonusPointsEnabled] = useState<boolean>(false);

  return (
    <Stack width="95%" alignItems={'center'} spacing={10}>
      <Typography variant="h3" className="Title">
        Game Settings
      </Typography>

      <Box className="settings-box" p={3}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Typography variant="h5">Number of rounds:</Typography>
            <TextField
              type="number"
              value={numberOfRounds}
              onChange={(e) => setNumberOfRounds(parseInt(e.target.value, 10))}
              inputProps={{ min: 1 }}
              className="number-input"
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Typography variant="h5">Time per song:</Typography>
            <TextField
              type="number"
              value={timePerSong}
              onChange={(e) => setTimePerSong(parseInt(e.target.value, 10))}
              inputProps={{ min: 1 }}
              className="number-input"
            />
            <Typography variant="h6">seconds</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Typography variant="h5">Enable bonus points:</Typography>
            <Switch
              checked={bonusPointsEnabled}
              onChange={(e) => setBonusPointsEnabled(e.target.checked)}
              className="switch"
            />
          </Stack>
        </Stack>
      </Box>

      <Button
        variant="contained"
        color="error"
        className="continue-button"
        sx={{ fontSize: '1.5rem' }} // Maybe to delete
      >
        Continue
      </Button>
    </Stack>
  );
};

export default GameSettingsPage;
