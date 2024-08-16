import { useState } from 'react';
import { Button, Stack, Typography, Container } from '@mui/material';
import MainWrapper from '../../components/MainWrapper';
import useGameRequests from '../handlers/useGameRequests';
import { theme } from '../../theme';
import Carousel from 'react-carousel-mui';
import CustomGenreCard from './CustomGenreCard';

const GenreSelectionPage = () => {
  const { nextSongRequest, startRoundRequest } = useGameRequests();
  const srcList = [
    '/public/Own-Playlist-cover.svg',
    '/public/Hip-Hop-cover.svg',
    '/public/Pop-cover.svg',
    '/public/Rock-cover.svg',
  ];

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (url: string) => {
    console.log('Card clicked:', url);
    setSelectedCard(url);
    // Implement your logic here, e.g., update state or navigate
  };

  const handleStartGame = async () => {
    if (selectedCard) {
      await startRoundRequest(await nextSongRequest());
    }
  };

  return (
    <MainWrapper
      topContent={
        <Typography color={theme.palette.primary.contrastText} variant="h3">
          Genre Selection
        </Typography>
      }
      bottomContent={
        <Button
          variant="contained"
          onClick={handleStartGame}
          disabled={!selectedCard}
        >
          Start Game
        </Button>
      }
    >
      <Stack width="100%" alignItems={'center'}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          spacing={8}
        >
          <Typography variant="h3">Choose Genre</Typography>
          <Container maxWidth="md">
            <Carousel
              items={srcList}
              itemsPerPage={{
                xs: 2,
                sm: 2,
                tablet: 2,
                md: 3,
                lg: 3,
                xl: 3,
              }}
              itemRenderer={(item) => (
                <CustomGenreCard
                  url={item}
                  onClick={() => handleCardClick(item)}
                  isSelected={selectedCard === item}
                />
              )}
              maxContainerWidth={theme.breakpoints.values['md']}
            />
          </Container>
        </Stack>
      </Stack>
    </MainWrapper>
  );
};

export default GenreSelectionPage;
