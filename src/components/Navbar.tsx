import { Stack } from '@mui/material';

const Navbar = () => {
  return (
    <Stack
      width="100%"
      alignItems={'center'}
      spacing={10}
      sx={{ marginTop: 1 }}
    >
      <img
        src="/music-master-logo-small.svg"
        alt="logo"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          window.location.href = '/';
        }}
      />
    </Stack>
  );
};

export default Navbar;
