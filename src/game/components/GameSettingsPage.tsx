import { Stack, Typography } from '@mui/material';
import './GameSettingsPage.css';
import Paper from '@mui/material/Paper';

const GameSettingsPage = () => {
  // const navigate = useNavigate();

  return (
    <Stack width="95%" alignItems={'center'} spacing={10}>
      <Typography variant="h4" fontFamily={'MyCustomFont'}>
        Game Settings
      </Typography>
      <Paper elevation={24} />
    </Stack>
  );
};

export default GameSettingsPage;
