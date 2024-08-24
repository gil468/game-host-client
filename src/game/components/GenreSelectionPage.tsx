import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Stack, Typography, CircularProgress, TextField } from '@mui/material';
import CustomGenreCard from './CustomGenreCard';
import TabsMenu from './TabsMenu';
import { prepareGameRequest } from '../../socketIO/SocketEmits';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

const carouselResponsiveness = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1550 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1550, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1150, min: 800 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
    <Stack width="100%" alignItems={'center'} height={'100%'}>
      <TabsMenu currTab={currTab} setCurrTab={setCurrTab} />
      <Stack
        width="100%"
        height="100%"
        justifyContent={'center'}
        alignItems={'center'}
      >
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
        ) : isLoading ? (
          <CircularProgress />
        ) : currPlaylists.length ? (
          <Carousel
            containerClass="carousel-container"
            responsive={carouselResponsiveness}
            infinite
            centerMode
          >
            {currPlaylists.map((item: PlaylistDto) => (
              <CustomGenreCard
                text={item.title}
                url={item.image}
                onClick={() => props.setPlaylistId(item.id)}
                isSelected={props.playlistId === item.id}
              />
            ))}
          </Carousel>
        ) : (
          <Typography>No Playlists</Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default GenreSelectionPage;
