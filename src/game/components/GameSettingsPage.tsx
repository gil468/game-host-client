import {
  Stack,
  Typography,
  TextField,
  Switch,
  Button,
  Paper,
  Box,
  Fade,
} from '@mui/material';
import { useState } from 'react';
import './GameSettingsPage.css';
import MainWrapper from '../../components/MainWrapper';
import { theme } from '../../theme';
// import useGameRequests from '../handlers/useGameRequests';
import useGameNavigation from '../handlers/useGameNavigation';

const Explanation = ({ text }: { text: string }) => (
  <Paper
    sx={{ m: 0, width: 120, height: 110, backgroundColor: 'white' }}
    elevation={6}
  >
    <Typography>{text}</Typography>
  </Paper>
);

const GameSettingsPage = () => {
  const [numberOfRounds, setNumberOfRounds] = useState<number>(10);
  const [timeBasedPointsEnabled, setTimeBasedPointsEnabled] =
    useState<boolean>(false);
  const [punishmentPointsEnabled, setPunishmentPointsEnabled] =
    useState<boolean>(false);
  const [permitBuzzerTwiceEnabled, setPermitBuzzerTwiceEnabled] =
    useState<boolean>(false);
  const isError = numberOfRounds < 1 || numberOfRounds > 30;
  const isEmpty = Number.isNaN(numberOfRounds);
  // const { nextSongRequest, startRoundRequest } = useGameRequests();

  const { genreSelection } = useGameNavigation();

  const getTextFieldProps = () => {
    if (isError) {
      return {
        label: 'Range of 1-30',
        error: true,
      };
    }
    if (isEmpty) {
      return {
        label: 'Required',
        error: true,
      };
    }
    return {};
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  return (
    <MainWrapper
      topContent={
        <Typography color={theme.palette.primary.contrastText} variant="h3">
          Game Settings
        </Typography>
      }
      bottomContent={
        // <Button
        //   variant="contained"
        //   onClick={async () => {
        //     await startRoundRequest(await nextSongRequest());
        //   }}
        //   disabled={isError || isEmpty}
        // >
        //   Start Game
        // </Button>
        <Button
          variant="contained"
          onClick={genreSelection}
          disabled={isError || isEmpty}
        >
          Continue
        </Button>
      }
    >
      <Stack width="100%" alignItems={'center'} spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={3}
          padding={1}
        >
          <Typography variant="h4">Number of rounds:</Typography>
          <TextField
            type="number"
            value={numberOfRounds}
            onChange={(e) => setNumberOfRounds(parseInt(e.target.value, 10))}
            inputProps={{ min: 1, max: 30 }}
            className="number-input"
            sx={{ width: '8vw' }}
            {...getTextFieldProps()}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={3}
        >
          <Typography variant="h4" sx={{ display: 'flex-end' }}>
            Time based points:
          </Typography>
          <Switch
            checked={timeBasedPointsEnabled}
            onChange={() => handleChange(setTimeBasedPointsEnabled)}
            className="switch"
          />

          <Fade in={timeBasedPointsEnabled}>
            <Box sx={{ display: 'flex' }}>
              <Explanation text="Earn more points for faster answers" />
            </Box>
          </Fade>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={3}
        >
          <Typography variant="h4">Enable punishment points:</Typography>

          <Switch
            checked={punishmentPointsEnabled}
            onChange={() => handleChange(setPunishmentPointsEnabled)}
            className="switch"
          />

          <Fade in={punishmentPointsEnabled}>
            <Box sx={{ display: 'flex' }}>
              <Explanation text="Lose points for incorrect guesses" />
            </Box>
          </Fade>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={3}
        >
          <Typography variant="h4">Permit buzzzer twice:</Typography>

          <Switch
            checked={permitBuzzerTwiceEnabled}
            onChange={() => handleChange(setPermitBuzzerTwiceEnabled)}
            className="switch"
          />

          <Fade in={permitBuzzerTwiceEnabled}>
            <Box sx={{ display: 'flex' }}>
              <Explanation text="Buzz twice in a row per round" />
            </Box>
          </Fade>
        </Stack>
      </Stack>
    </MainWrapper>
  );
};

export default GameSettingsPage;
