import {
  Stack,
  Typography,
  TextField,
  Switch,
  Paper,
  Box,
  Fade,
} from '@mui/material';
import './GameSettingsPage.css';

const Explanation = ({ text }: { text: string }) => (
  <Paper
    sx={{
      m: 0,
      width: { lg: '7vw', xl: '6vw' },
      height: { lg: '13vh', xl: '10vh' },
      backgroundColor: 'white',
    }}
    elevation={6}
  >
    <Typography sx={{ fontSize: { lg: '0.95rem', xl: '1.7vh' } }}>
      {text}
    </Typography>
  </Paper>
);

export interface GameSettings {
  totalRounds: number;
  isTimeBasedScore: boolean;
  isPunishmentScoreAllowed: boolean;
  isBuzzerTwiceAllowed: boolean;
}

export interface GameSettingsPageProps {
  gameSettings: GameSettings;
  setGameSettings: (props: Partial<GameSettings>) => void;
}

const GameSettingsPage = ({
  gameSettings,
  setGameSettings,
}: GameSettingsPageProps) => {
  const isError = gameSettings.totalRounds < 1 || gameSettings.totalRounds > 30;
  const isEmpty = Number.isNaN(gameSettings.totalRounds);

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

  return (
    <Stack width="100%" alignItems={'center'} spacing={2}>
      <Stack></Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={3}
      >
        <Typography variant="h4">Number of rounds:</Typography>
        <TextField
          type="number"
          value={gameSettings.totalRounds}
          onChange={(e) =>
            setGameSettings({ totalRounds: parseInt(e.target.value, 10) })
          }
          inputProps={{ min: 1, max: 30 }}
          className="number-input"
          sx={{ width: '8rem' }}
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
          checked={gameSettings.isTimeBasedScore}
          onChange={(_, status) =>
            setGameSettings({ isTimeBasedScore: status })
          }
          className="switch"
        />

        <Fade in={gameSettings.isTimeBasedScore}>
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
          checked={gameSettings.isPunishmentScoreAllowed}
          onChange={(_, status) =>
            setGameSettings({ isPunishmentScoreAllowed: status })
          }
          className="switch"
        />

        <Fade in={gameSettings.isPunishmentScoreAllowed}>
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
          checked={gameSettings.isBuzzerTwiceAllowed}
          onChange={(_, status) =>
            setGameSettings({ isBuzzerTwiceAllowed: status })
          }
          className="switch"
        />

        <Fade in={gameSettings.isBuzzerTwiceAllowed}>
          <Box sx={{ display: 'flex' }}>
            <Explanation text="Buzz in twice in a row per round" />
          </Box>
        </Fade>
      </Stack>
    </Stack>
  );
};

export default GameSettingsPage;
