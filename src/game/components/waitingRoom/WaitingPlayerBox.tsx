import { Stack, Typography } from '@mui/material';
import Avatar, { genConfig } from 'react-nice-avatar';

interface WaitingPlayerBoxProps {
  name: string;
}

const WaitingPlayerBox = (props: WaitingPlayerBoxProps) => {
  return (
    <Stack
      direction={'row'}
      border={'1px solid'}
      borderRadius={'5px'}
      padding={'10px'}
      paddingLeft={'20px'}
      alignItems={'center'}
      gap={2}
      className="fade-in"
    >
      <Avatar
        style={{ width: '3rem', height: '3rem' }}
        {...genConfig(props.name)}
      />
      <Typography fontSize="1.25rem">{props.name}</Typography>
    </Stack>
  );
};

export default WaitingPlayerBox;
