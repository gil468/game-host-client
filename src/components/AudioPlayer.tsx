import { LinearProgress, Stack, linearProgressClasses } from '@mui/material';
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress % 100);
    }
  };

  const handleSongPlaying = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    handleSongPlaying();
  }, [handleSongPlaying]);

  return (
    <Stack sx={{ width: '100%', marginTop: '10px' }}>
      <audio
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongPlaying}
        {...props}
        ref={audioRef}
      />
      <LinearProgress
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
      />
    </Stack>
  );
};

export default CustomAudioPlayer;
