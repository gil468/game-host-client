import {
  Box,
  Button,
  IconButton,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';

import AnswerPage from './AnswerPage';
import GameLeaderboardPage from './GameLeaderboardPage';
import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MainWrapper from '../../components/MainWrapper';
import useGameRequests from '../handlers/useGameRequests';
import { SongProps } from './GameInProgress';
import CountdownExample from '../../components/Countdown';

const RoundResultsPage = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const handleBack = () => setCurrStep((x) => x - 1);
  const handleForward = () => setCurrStep((x) => x + 1);

  const { nextSongRequest, startRoundRequest } = useGameRequests();
  const [songProps, setSongProps] = useState<SongProps>();
  const [showCountdown, setShowCountdown] = useState<boolean>(false);

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
        topContent={
          <Box
            sx={{
              display: 'grid',
              width: '70%',
              gridTemplateColumns: '5% 90% 5%',
            }}
          >
            {/* Back Button */}
            {currStep !== 0 ? (
              <IconButton
                disabled={currStep === 0}
                onClick={handleBack}
                sx={{ mr: 2 }}
                disableRipple
              >
                <ArrowBackIos />
              </IconButton>
            ) : (
              <div></div>
            )}

            <Stepper activeStep={currStep}>
              <Step key="answer" completed={currStep === 1}>
                <StepLabel>Round Answer</StepLabel>
              </Step>
              <Step key="leaderboard">
                <StepLabel>Leaderboard</StepLabel>
              </Step>
            </Stepper>
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
          </Box>
        }
        bottomContent={
          <>
            <Button
              variant="contained"
              onClick={nextRound}
              // disabled={!songProps}
            >
              Next round
            </Button>
            {showCountdown && (
              <CountdownExample
                onEnd={async () => {
                  songProps && (await startRoundRequest(songProps));
                }}
              />
            )}
          </>
        }
      >
        {currStep === 0 ? (
          <AnswerPage />
        ) : (
          <GameLeaderboardPage />
          // To-Do: Where to implement this?
          // openLeaderboard(state?.scores ?? [])
        )}
      </MainWrapper>
    </>
  );
};

export default RoundResultsPage;
