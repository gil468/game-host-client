import { Button, Typography, Stack } from '@mui/material';
import { FaMedal } from 'react-icons/fa';
import { SiFireship } from 'react-icons/si';
import MainWrapper from '../../components/MainWrapper';
import CountdownExample from '../../components/Countdown';
import { useMemo, useState } from 'react';
import { SongProps } from './GameInProgress';
import useGameRequests from '../handlers/useGameRequests';
import useBackHome from '../../hooks/useBackHome';
import { ScoresProps } from '../GameInterfaces';

const GameLeaderboardPage = () => {
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [songProps, setSongProps] = useState<SongProps>();

  const { nextSongRequest, startRoundRequest } = useGameRequests();

  const scores = useBackHome<{ scores: ScoresProps }>()?.scores ?? [];

  const sortedScores = useMemo(
    () => scores.sort((a, b) => b.score - a.score),
    [scores]
  );

  return (
    <MainWrapper
      mainComponenetProps={{
        sx: { overflowY: 'scroll', '::-webkit-scrollbar': { width: 0 } },
      }}
      bottomContent={
        <Button
          variant="contained"
          onClick={async () => {
            const res = await nextSongRequest();
            if (res) {
              setSongProps(res);
              setShowCountdown(true);
            }
          }}
        >
          Next Song
        </Button>
      }
    >
      <Typography variant="h3">Leaderboard</Typography>
      <div style={{ gap: '0.5rem', display: 'grid', padding: '1rem' }}>
        {sortedScores.map((player, index) => (
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
              <Stack direction="row" spacing={2}>
                <Typography>{player.userName}</Typography>
                <Typography sx={{ color: '#00CC00' }}>+100</Typography>{' '}
                {/* To-Do: Add functionality for scoring */}
                <SiFireship
                  style={{ color: 'orangered', width: '2rem', height: '2rem' }}
                />
                {/* To-Do: Add functionality for streak */}
              </Stack>
              <Typography>{player.score}</Typography>
            </div>
          </div>
        ))}
      </div>
      {showCountdown && (
        <CountdownExample
          onEnd={async () => {
            songProps && (await startRoundRequest(songProps));
          }}
        />
      )}
    </MainWrapper>
  );
};

export default GameLeaderboardPage;
