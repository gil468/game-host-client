import {
  Box,
  Button,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import AnswerPage from './AnswerPage';
import GameLeaderboardPage from './GameLeaderboardPage';
import { useContext, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MainWrapper from '../../components/MainWrapper';
import useGameRequests from '../handlers/useGameRequests';
import { SongProps } from './GameInProgress';
import CountdownExample from '../../components/Countdown';
import { GameStatusContext } from '../../providers/GameStatusProvider';
import { useLocation } from 'react-router-dom';
import { ScoresProps } from '../GameInterfaces';

const RoundResultsPage = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const handleBack = () => setCurrStep((x) => x - 1);
  const handleForward = () => setCurrStep((x) => x + 1);
  const { nextSongRequest, startRoundRequest, endGameRequest } =
    useGameRequests();
  const [songProps, setSongProps] = useState<SongProps>();
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const { gameProps } = useContext(GameStatusContext);

  const scores = (useLocation().state as { scores: ScoresProps })?.scores ?? [];

  const nextRound = async () => {
    const res = await nextSongRequest();
    if (res) {
      setSongProps(res);
      setShowCountdown(true);
    }
  };

  return (
    <>
      <MainWrapper
        mainComponenetProps={{
          sx: { display: 'flex', flexDirection: 'column', overflowY: 'auto' },
        }}
        topContent={
          <Box
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{`Round ${gameProps?.currRound} / ${gameProps?.gameRounds}`}</Typography>
            <Stack
              sx={{
                display: 'grid',
                width: '70%',
                gridTemplateColumns: '5% 90% 5%',
                alignItems: 'center',
              }}
            >
              {/* Back Button */}
              {currStep !== 0 ? (
                <IconButton disableRipple color="info" onClick={handleBack}>
                  <ArrowBackIos />
                </IconButton>
              ) : (
                <div></div>
              )}

              <Stack>
                <Stepper activeStep={currStep}>
                  <Step key="answer" completed={currStep === 1}>
                    <StepLabel>Round Answer</StepLabel>
                  </Step>
                  <Step key="leaderboard">
                    <StepLabel>Leaderboard</StepLabel>
                  </Step>
                </Stepper>
              </Stack>

              {currStep !== 1 ? (
                <IconButton
                  onClick={handleForward}
                  disabled={currStep === 1}
                  sx={{ ml: 2 }}
                  disableRipple
                >
                  <ArrowForwardIos />
                </IconButton>
              ) : (
                <div></div>
              )}
            </Stack>
          </Box>
        }
        bottomContent={
          <div style={{ display: 'flex', gap: 20 }}>
            <Button variant="contained" color="error" onClick={endGameRequest}>
              End Game
            </Button>
            {gameProps && gameProps?.currRound < gameProps?.gameRounds && (
              <Button variant="contained" onClick={nextRound}>
                Next round
              </Button>
            )}

            {showCountdown && (
              <CountdownExample
                onEnd={async () => {
                  songProps && (await startRoundRequest(songProps));
                }}
              />
            )}
          </div>
        }
      >
        {currStep === 0 ? (
          <AnswerPage />
        ) : (
          <GameLeaderboardPage scores={scores} />
        )}
      </MainWrapper>
    </>
  );
};

export default RoundResultsPage;
