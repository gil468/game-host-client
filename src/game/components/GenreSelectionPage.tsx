import * as React from 'react';
import { useEffect, useState } from 'react';
import { Stack, Typography, Container, CircularProgress } from '@mui/material';
import { theme } from '../../theme';
import Carousel from 'react-carousel-mui';
import CustomGenreCard from './CustomGenreCard';
import axios, { AxiosResponse } from 'axios';
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

export enum PlaylistOptions {
  MasterPlaylists,
  TopCountryPlaylists,
  MyPlaylists,
}

const GenreSelectionPage = (props: GenreSelectionPageProps) => {
  const [playlists, setPlaylists] = useState<GetPlaylistDto[]>([]);

  const [currTab, setCurrTab] = useState<PlaylistOptions>(
    PlaylistOptions.MasterPlaylists
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCardClick = (url: string) => {
    props.setPlaylistId(url);
  };

  const currTabToPlaylists: Record<
    PlaylistOptions,
    () => Promise<AxiosResponse<GetPlaylistDto[]>>
  > = {
    [PlaylistOptions.MasterPlaylists]: async () =>
      await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/game-manager/master-playlists`
      ),
    [PlaylistOptions.TopCountryPlaylists]: async () =>
      await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/game-manager/top-playlists`
      ),
    [PlaylistOptions.MyPlaylists]: async () =>
      await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/game-manager/my-playlists`,
        { withCredentials: true }
      ),
  };

  useEffect(() => {
    setPlaylists([]);
    setIsLoading(true);
    const fetch = async () => {
      try {
        setPlaylists((await currTabToPlaylists[currTab]()).data);
      } catch (ex) {}
      setIsLoading(false);
    };
    fetch();
  }, [currTab]);

  return (
    <Stack width="100%" alignItems={'center'}>
      <Typography variant="h3">Choose Genre</Typography>

      <TabsMenu currTab={currTab} setCurrTab={setCurrTab} />

      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        spacing={8}
        padding={2}
      >
        <Container maxWidth="md">
          {isLoading ? (
            <CircularProgress />
          ) : playlists.length ? (
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
                  text={item.title}
                  url={item.image}
                  onClick={() => handleCardClick(item.id)}
                  isSelected={props.playlistId === item.id}
                />
              )}
              maxContainerWidth={theme.breakpoints.values['md']}
            />
          ) : (
            <Typography>No Playlists</Typography>
          )}
        </Container>
      </Stack>
    </Stack>
  );
};

export default GenreSelectionPage;
