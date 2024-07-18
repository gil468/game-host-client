import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#FFEDFB',
    },
    text: {
      primary: '#000000',
    },
    info: {
      main: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          width: '15rem',
        },
      },
    },
  },
  typography: {
    fontFamily: 'MusicMasterFont',
    fontSize: 16 * 1.25,
  },
});
