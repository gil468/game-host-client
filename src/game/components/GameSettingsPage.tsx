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
  const [numberOfRounds, setNumberOfRounds] = useState<number>(10);
  const [timePerSong, setTimePerSong] = useState<number>(5);
  const [bonusPointsEnabled, setBonusPointsEnabled] = useState<boolean>(false);

  return (
    <Stack width="95%" alignItems={'center'} spacing={10}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
        >
          <Typography variant="h5" sx={{ color: 'black' }}>
            Number of rounds:
          </Typography>
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
          <Typography variant="h5" sx={{ color: 'black' }}>
            Time per song:
          </Typography>
          <TextField
            type="number"
            value={timePerSong}
            onChange={(e) => setTimePerSong(parseInt(e.target.value, 10))}
            inputProps={{ min: 1 }}
            className="number-input"
          />
          <Typography variant="h6" sx={{ color: 'black' }}>
            seconds
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
        >
          <Typography variant="h5" sx={{ color: 'black' }}>
            Enable bonus points:
          </Typography>
          <Switch
            checked={bonusPointsEnabled}
            onChange={(e) => setBonusPointsEnabled(e.target.checked)}
            className="switch"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GameSettingsPage;
