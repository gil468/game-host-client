import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    background: {
      default: '#121212',
      paper: '#FFEDFB',
    },
    text: {
      primary: '#ffffff',
      secondary: '#000000',
    },
  },
  typography: {
    fontFamily: 'MusicMasterFont',
  },
});
