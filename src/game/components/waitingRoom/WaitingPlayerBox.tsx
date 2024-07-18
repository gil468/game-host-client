import { Typography } from '@mui/material';

interface WaitingPlayerBoxProps {
  name: string;
}

const WaitingPlayerBox = (props: WaitingPlayerBoxProps) => {
  return (
    <Typography
      className="fade-in"
      sx={{
        display: 'flex',
        border: '1px solid',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        overflow: 'hidden',
      }}
    >
      {props.name}
    </Typography>
  );
};

export default WaitingPlayerBox;
