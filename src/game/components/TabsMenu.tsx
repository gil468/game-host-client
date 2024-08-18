import * as React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { theme } from '../../theme';
import { PlaylistOptions } from './GenreSelectionPage';
// import Box from '@mui/joy/Box';
// import Tabs from '@mui/joy/Tabs';
// import TabList from '@mui/joy/TabList';
// import Tab from '@mui/joy/Tab';
// import { CssVarsProvider } from '@mui/joy/styles';

interface GenreTabsMenuProps {
  currTab: PlaylistOptions;
  setCurrTab: React.Dispatch<React.SetStateAction<PlaylistOptions>>;
}

const TabsMenu = (props: GenreTabsMenuProps) => {
  const handleChange = (_: React.SyntheticEvent, newValue: PlaylistOptions) => {
    props.setCurrTab(newValue);
  };

  const tabLabels = [
    'Music Master recommend',
    'Top 50',
    'Choose your own playlist',
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={props.currTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{ backgroundColor: 'white' }}
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{ color: theme.palette.text.primary }}
          />
        ))}
      </Tabs>
    </Box>

    // <CssVarsProvider>
    //   <Box
    //     sx={{ display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}
    //   >
    //     <Tabs
    //       aria-label="Plain tabs"
    //       value={index}
    //       onChange={(event, value) => setIndex(value as number)}
    //     >
    //       <TabList variant="plain">
    //         <Tab variant={index === 0 ? 'outlined' : 'plain'}>First tab</Tab>
    //         <Tab variant={index === 1 ? 'outlined' : 'plain'}>Second tab</Tab>
    //         <Tab variant={index === 2 ? 'outlined' : 'plain'}>Third tab</Tab>
    //       </TabList>
    //     </Tabs>
    //   </Box>
    // </CssVarsProvider>
  );
};

export default TabsMenu;
