import * as React from 'react';
import { useEffect, useState } from 'react';
import { Stack, Typography, Container, Box, Tabs, Tab } from '@mui/material';
import { theme } from '../../theme';
import Carousel from 'react-carousel-mui';
import CustomGenreCard from './CustomGenreCard';
import axios from 'axios';
import TabsMenu from './TabsMenu';

interface GetPlaylistDto {
  id: string;
  image: string;
  title: string;
}

interface GenreSelectionPageProps {
  playlistId: string | undefined;
  setPlaylistId: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const GenreSelectionPage = (props: GenreSelectionPageProps) => {
  const [playlists, setPlaylists] = useState<GetPlaylistDto[]>([]);
  const handleCardClick = (url: string) => {
    props.setPlaylistId(url);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/game-manager/master-playlists`
      );
      setPlaylists((curr) => [...curr, ...res.data]);
      const res2 = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/game-manager/top-playlists`
      );
      setPlaylists((curr) => [...curr, ...res2.data]);
    };
    fetch();
  }, []);

  return (
    <Stack width="100%" alignItems={'center'}>
      <Typography variant="h3">Choose Genre</Typography>

      <TabsMenu />
      
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        spacing={8}
        padding={2}
      >
        <Container maxWidth="md">
          <Carousel
            items={playlists}
            itemsPerPage={{
              xs: 2,
              sm: 2,
              tablet: 2,
              md: 3,
              lg: 3,
              xl: 3,
            }}
            itemRenderer={(item: GetPlaylistDto) => (
              <CustomGenreCard
                key={item.id}
                url={item.image}
                onClick={() => handleCardClick(item.id)}
                isSelected={props.playlistId === item.id}
              />
            )}
            maxContainerWidth={theme.breakpoints.values['md']}
          />
        </Container>
      </Stack>
    </Stack>
  );
};

export default GenreSelectionPage;
