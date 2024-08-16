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
import { useNavigate } from 'react-router-dom';
import { createGameRequest } from '../../socketIO/SocketEmits';

export type GameCreationProps = GameSettings & { playlistId: string };

const GameCreatorPage = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const navigate = useNavigate();
  const handleBack = () => setCurrStep((x) => x - 1);
  const handleForward = () => setCurrStep((x) => x + 1);

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    numberOfRounds: 10,
    permitBuzzerTwiceEnabled: true,
    punishmentPointsEnabled: true,
    timeBasedPointsEnabled: true,
  });
  const [playlistId, setPlaylistId] = useState<string | undefined>();

  const saveToLocalStorage = (
    key: string,
    value: any,
    expirationMinutes: number
  ) => {
    const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000; // Convert minutes to milliseconds
    const data = { value, expirationTime };
    localStorage.setItem(key, JSON.stringify(data));
  };

  const launchNewGame = async () => {
    const res = await createGameRequest({
      ...gameSettings,
      playlistId: playlistId!,
    });
    if (res) {
      saveToLocalStorage('pinCode', res.gameId, 0.1);
      saveToLocalStorage('gameSecret', res.gameSecret, 0.1);
      navigate('/game', {
        state: { pinCode: res.gameId, gameSecret: res.gameSecret },
      });
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
            onClick={launchNewGame}
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
