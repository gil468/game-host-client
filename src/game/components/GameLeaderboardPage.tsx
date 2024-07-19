import { Button, Typography } from '@mui/material';
import { FaMedal } from 'react-icons/fa';
import MainWrapper from '../../components/MainWrapper';
import CountdownExample from '../../components/Countdown';
import { nextSongRequest } from '../handlers/GameRequests';
import { useState } from 'react';
interface GameLeaderboardPageProps {
  players: PlayingPlayerProps[];
}

interface PlayingPlayerProps {
  name: string;
  score: number;
}

const GameLeaderboardPage = (props: GameLeaderboardPageProps) => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);

  return (
    <MainWrapper
      mainComponenetProps={{
        sx: { overflowY: 'scroll', '::-webkit-scrollbar': { width: 0 } },
      }}
      bottomContent={
        <Button variant="contained" onClick={() => setShowCountdown(true)}>
          Next Song
        </Button>
      }
    >
      <div style={{ gap: '0.5rem', display: 'grid', padding: '1rem' }}>
        {props.players.map((player, index) => (
          <div
            key={index}
            style={{ display: 'grid', gridTemplateColumns: '5% 95%', gap: 10 }}
          >
            {index < 3 ? (
              <FaMedal
                color={
                  index === 0 ? 'gold' : index === 1 ? 'silver' : '#d98100'
                }
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div></div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid',
                borderRadius: 5,
                padding: '10px',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{player.name}</Typography>
              <Typography>{player.score}</Typography>
            </div>
          </div>
        ))}
      </div>
      {showCountdown && <CountdownExample onEnd={nextSongRequest} />}
    </MainWrapper>
  );
};

export default GameLeaderboardPage;
