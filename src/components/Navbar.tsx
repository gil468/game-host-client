import { Typography, useTheme } from '@mui/material';

const Navbar = () => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        backgroundColor: theme.palette.secondary.main,
        marginBottom: '10px',
      }}
      color={theme.palette.background.default}
      variant={'h1'}
    >
      Music Master
    </Typography>
  );
};

export default Navbar;
