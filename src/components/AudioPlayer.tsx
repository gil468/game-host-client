import { Button, LinearProgress, Stack, linearProgressClasses } from '@mui/material';
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface CustomAudioPlayerProps
  extends React.DetailedHTMLProps<
    React.AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement
  > {
  src: string;
  isPlaying: boolean;
}

const CustomAudioPlayer = ({ isPlaying, ...props }: CustomAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [navigationEntry] = performance.getEntriesByType('navigation');
  const [isRefreshed, setIsRefreshed] = useState((navigationEntry as PerformanceNavigationTiming).type === 'reload')
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress % 100);
    }
  };

  const handleSongPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
    if (isPlaying && !isRefreshed) {
      audio.play();
    } else {
      audio.pause();
    }
  }
  }, [isPlaying, isRefreshed]);

  useEffect(() => {
    handleSongPlaying();
  }, [handleSongPlaying]);

  return (
    <Stack sx={{ width: '100%', marginTop: '10px', alignItems : 'center' }}>
      <audio
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongPlaying}
        {...props}
        ref={audioRef}
      />
      {isRefreshed ? <Button variant="contained" onClick={() => {setIsRefreshed(false)}}>Play</Button> : <LinearProgress
        color="secondary"
        sx={{
          alignSelf: 'center',
          width: '100%',
          height: 30,
          borderRadius: 5,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
          },
        }}
        variant="determinate"
        value={progress}
      />}
    </Stack>
  );
};

export default CustomAudioPlayer;
