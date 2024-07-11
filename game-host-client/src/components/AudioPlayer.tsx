import { LinearProgress, Stack, linearProgressClasses } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';

interface CustomAudioPlayerProps extends React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement> {
    src : string,
    isPlaying : boolean
}

const CustomAudioPlayer = ({isPlaying, ...props} : CustomAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  useEffect(() => {
    if (isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
  },[isPlaying])

  return (
    <Stack sx={{width :'100%', marginTop : '10px'}}>
        <audio autoPlay onTimeUpdate={handleTimeUpdate} {...props} ref={audioRef} />
        <LinearProgress color='secondary' sx={{
            width : '20%', alignSelf : 'center', height : 10, borderRadius: 5,
            [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
              }
            }} variant="determinate" value={progress}  />
    </Stack>
  );
};

export default CustomAudioPlayer;
