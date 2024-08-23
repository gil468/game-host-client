import { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Pause, MusicNote } from '@mui/icons-material';
import AudioPlayer from '../../components/AudioPlayer';
import { GameStatusContext } from '../../providers/GameStatusProvider';
import MainWrapper from '../../components/MainWrapper';
import useBackHome from '../../hooks/useBackHome';
import useGameRequests from '../handlers/useGameRequests';

export interface SongProps {
  previewUrl: string;
  round: number;
}

const GameInProgress = () => {
  const { gameProps } = useContext(GameStatusContext);

  const isPlaying = gameProps?.gameStatus === 'Running';

  const { endGameRequest, endRoundRequest } = useGameRequests();
  const songUrl = useBackHome<string>();
  return (
    <MainWrapper
      topContent={
        <Typography
          variant="h4"
          color={'info.main'}
        >{`Round ${gameProps?.currRound}`}</Typography>
      }
      mainComponenetProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
      }}
      bottomContent={
        <Button variant="contained" color="error" onClick={endGameRequest}>
          End Game
        </Button>
      }
    >
      <Stack gap={2}>
        <Typography variant={'h4'}>
          {isPlaying ? 'Song is Playing' : 'Song is Paused'}
        </Typography>
        <Typography color="primary" variant={'h5'}>
          {isPlaying ? 'Someone knows?...' : 'Take a guess...'}
        </Typography>
      </Stack>
      <Stack gap={2} sx={{ width: '60%', alignItems: 'center' }}>
        {isPlaying ? (
          <MusicNote sx={{ fontSize: 120 }} />
        ) : (
          <Pause sx={{ fontSize: 120 }} />
        )}
        <AudioPlayer src={songUrl ?? ''} isPlaying={isPlaying} />
      </Stack>
      <Button variant="contained" onClick={endRoundRequest}>
        Skip Song
      </Button>
      {/* {showCountdown && (
        <CountdownExample
          onEnd={() => {
            setGameStatus('Running');
            setShowCountdown(false);
          }}
        />
      )} */}
    </MainWrapper>
  );
};

export default GameInProgress;
