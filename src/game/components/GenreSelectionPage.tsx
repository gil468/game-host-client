import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Stack,
  Typography,
  Container,
  CircularProgress,
  TextField,
} from '@mui/material';
import { theme } from '../../theme';
import Carousel from 'react-carousel-mui';
import CustomGenreCard from './CustomGenreCard';
import TabsMenu from './TabsMenu';
import { prepareGameRequest } from '../../socketIO/SocketEmits';

export interface PlaylistDto {
  id: string;
  image: string;
  title: string;
}

export interface GamePrepareDto {
  master: PlaylistDto[];
  top: PlaylistDto[];
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
  const [playlists, setPlaylists] = useState<GamePrepareDto>();

  const [currTab, setCurrTab] = useState<PlaylistOptions>(
    PlaylistOptions.MasterPlaylists
  );
  const currPlaylists = useMemo(
    () =>
      playlists
        ? playlists[
            currTab === PlaylistOptions.MasterPlaylists ? 'master' : 'top'
          ]
        : [],
    [currTab, playlists]
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      setPlaylists(await prepareGameRequest());
      setIsLoading(false);
    };
    fetchPlaylists();
  }, []);

  return (
    <Stack width="100%" alignItems={'center'}>
      <TabsMenu currTab={currTab} setCurrTab={setCurrTab} />
      {currTab === PlaylistOptions.MyPlaylists ? (
        <TextField
          sx={{ backgroundColor: 'primary.main' }}
          placeholder="Playlist link"
          onChange={(e) => {
            if (e.target.value) {
              const regex = e.target.value.match(/playlist\/([a-zA-Z0-9]+)/);
              if (regex && regex[1].length === 22)
                props.setPlaylistId(regex[1]);
              else props.setPlaylistId(undefined);
            }
          }}
        ></TextField>
      ) : (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          spacing={8}
          padding={2}
        >
          <Container>
            {isLoading ? (
              <CircularProgress />
            ) : currPlaylists.length ? (
              <Carousel
                items={currPlaylists}
                itemsPerPage={{
                  xs: 1,
                  sm: 2,
                  tablet: 2,
                  md: 3,
                  lg: 4,
                  xl: 5,
                }}
                itemRenderer={(item: PlaylistDto) => (
                  <CustomGenreCard
                    text={item.title}
                    url={item.image}
                    onClick={() => props.setPlaylistId(item.id)}
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
      )}
    </Stack>
  );
};

export default GenreSelectionPage;
