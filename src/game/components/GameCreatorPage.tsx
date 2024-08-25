import {
  Box,
  Button,
  IconButton,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import GameSettingsPage, { GameSettings } from './GameSettingsPage';
import GenreSelectionPage from './GenreSelectionPage';
import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MainWrapper from '../../components/MainWrapper';
import useGameRequests from '../handlers/useGameRequests';

export type GameCreationProps = GameSettings & { playlistId: string };

const GameCreatorPage = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const handleBack = () => setCurrStep((x) => x - 1);
  const handleForward = () => setCurrStep((x) => x + 1);

  const { createGameRequest } = useGameRequests();

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    totalRounds: 10,
    isBuzzerTwiceAllowed: true,
    isPunishmentScoreAllowed: true,
    isTimeBasedScore: true,
  });
  const [playlistId, setPlaylistId] = useState<string | undefined>();

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
              <Step key="settings" completed={currStep === 1}>
                <StepLabel>Game Settings</StepLabel>
              </Step>
              <Step key="playlist-selection">
                <StepLabel>Select Playlist</StepLabel>
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
          <Button
            variant="contained"
            onClick={() =>
              playlistId &&
              createGameRequest({ ...gameSettings, playlistId: playlistId })
            }
            disabled={!playlistId}
          >
            Create Game
          </Button>
        }
      >
        {currStep === 0 ? (
          <GameSettingsPage
            gameSettings={gameSettings}
            setGameSettings={(partial) =>
              setGameSettings((value) => ({ ...value, ...partial }))
            }
          />
        ) : (
          <GenreSelectionPage
            playlistId={playlistId}
            setPlaylistId={setPlaylistId}
          />
        )}
      </MainWrapper>
    </>
  );
};

export default GameCreatorPage;
