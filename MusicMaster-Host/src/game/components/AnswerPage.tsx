import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CountdownExample from '../../components/Countdown';
import { nextSongRequest } from '../handlers/GameRequests';
import MainWrapper from '../../components/MainWrapper';

export interface AnswerPageProps {
  songName: string;
}

const AnswerPage = () => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const songName = useLocation().state.songName;

  return (
    <MainWrapper
      bottomContent={
        showCountdown && <CountdownExample onEnd={nextSongRequest} />
      }
    >
      <Stack width="95%" alignItems={'center'} spacing={10}>
        <Typography variant="h3">{`The song is ${songName}`}</Typography>
        <Button onClick={() => setShowCountdown(true)}>Next Song</Button>
      </Stack>
    </MainWrapper>
  );
};

export default AnswerPage;
