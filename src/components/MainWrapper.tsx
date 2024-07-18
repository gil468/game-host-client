import React, { PropsWithChildren, ReactNode } from 'react';
import { Paper, Box } from '@mui/material';

interface MainWrapperProps {
  topContent?: ReactNode;
  bottomContent?: ReactNode;
}

const MainWrapper = (props: PropsWithChildren<MainWrapperProps>) => {
  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
        gridTemplateRows: '1fr 70% 1fr',
        flexGrow: 1,
        gap: 2,
      }}
    >
      {props.topContent}
      <Paper
        sx={{
          width: '70%',
          height: '100%',
        }}
      >
        {props.children}
      </Paper>
      {props.bottomContent}
    </Box>
  );
};

export default MainWrapper;
