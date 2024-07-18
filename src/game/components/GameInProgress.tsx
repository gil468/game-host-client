import { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Pause, MusicNote } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import AudioPlayer from '../../components/AudioPlayer';
import CountdownExample from '../../components/Countdown';
import { GameStatusContext } from '../../providers/GameStatusProvider';
import useGameNavigation from '../handlers/useGameNavigation';
import { skipRoundRequest, endGameRequest } from '../handlers/GameRequests';
import MainWrapper from '../../components/MainWrapper';

interface GameInProgressProps {
  showCountdown: boolean;
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SongProps {
  songId: number;
  round: number;
}

const GameInProgress = ({
  setShowCountdown,
  showCountdown,
}: GameInProgressProps) => {
  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  const isPlaying = gameStatus === 'Running';

  const { answerRevail, endGame } = useGameNavigation();
  const songProps = useLocation().state as SongProps;

  return (
    <MainWrapper
      topContent={
        <Typography
          variant="h4"
          color={'info.main'}
        >{`Round ${songProps.round}`}</Typography>
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
        <Button
          color="error"
          onClick={async () => {
            const res = await endGameRequest();
            res.status === HttpStatusCode.Ok && endGame(res.data);
          }}
        >
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
        <AudioPlayer
          src={`${process.env.REACT_APP_SERVER_URL}/songs/${songProps.songId}.mp3`}
          isPlaying={isPlaying}
        />
      </Stack>
      <Button
        onClick={async () => {
          const res = await skipRoundRequest();
          res.status === HttpStatusCode.Ok && answerRevail(res.data);
        }}
      >
        Skip Song
      </Button>
      {showCountdown && (
        <CountdownExample
          onEnd={() => {
            setGameStatus('Running');
            setShowCountdown(false);
          }}
        />
      )}
    </MainWrapper>
  );
};

export default GameInProgress;
