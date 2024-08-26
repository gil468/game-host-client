import {
  Stack,
  Typography,
  TextField,
  Switch,
  Tooltip,
  SxProps,
} from '@mui/material';
import './GameSettingsPage.css';
import HelpIcon from '@mui/icons-material/Help';

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

  const settingStyle: SxProps = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  };

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
    <Stack
      direction="column"
      height={'100%'}
      justifyContent="space-evenly"
      paddingLeft={5}
      paddingRight={5}
    >
      <Stack sx={{ ...settingStyle }}>
        <Typography variant="h4">Number of rounds:</Typography>
        <TextField
          type="number"
          value={gameSettings.totalRounds}
          onChange={(e) =>
            setGameSettings({ totalRounds: parseInt(e.target.value, 10) })
          }
          inputProps={{
            min: 1,
            max: 30,
            style: { padding: 8, textAlign: 'center' },
          }}
          className="number-input"
          maxRows={1}
          sx={{ width: '8rem' }}
          {...getTextFieldProps()}
        />
      </Stack>

      <Stack sx={settingStyle}>
        <Typography variant="h4" sx={{ display: 'flex-end' }}>
          Time based points:
        </Typography>
        <Switch
          sx={{ marginLeft: 'auto' }}
          checked={gameSettings.isTimeBasedScore}
          onChange={(_, status) =>
            setGameSettings({ isTimeBasedScore: status })
          }
          className="switch"
        />

        <Tooltip arrow title="Earn more points for faster answers">
          <HelpIcon />
        </Tooltip>
      </Stack>

      <Stack sx={settingStyle}>
        <Typography variant="h4">Enable punishment points:</Typography>

        <Switch
          checked={gameSettings.isPunishmentScoreAllowed}
          onChange={(_, status) =>
            setGameSettings({ isPunishmentScoreAllowed: status })
          }
          sx={{ marginLeft: 'auto' }}
          className="switch"
        />

        <Tooltip arrow title="Lose points for incorrect guesses">
          <HelpIcon />
        </Tooltip>
      </Stack>

      <Stack sx={settingStyle}>
        <Typography variant="h4">Allow buzzer twice:</Typography>

        <Switch
          checked={gameSettings.isBuzzerTwiceAllowed}
          onChange={(_, status) =>
            setGameSettings({ isBuzzerTwiceAllowed: status })
          }
          sx={{ marginLeft: 'auto' }}
          className="switch"
        />

        <Tooltip arrow title="Allow players to buzzer twice (or more) in a row">
          <HelpIcon />
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default GameSettingsPage;
