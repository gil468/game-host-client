import { PropsWithChildren, ReactNode } from 'react';
import { Paper, Box, BoxProps, PaperProps } from '@mui/material';

interface MainWrapperProps extends BoxProps {
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  mainComponenetProps?: PaperProps;
}

const MainWrapper = ({
  topContent,
  bottomContent,
  children,
  mainComponenetProps,
  ...props
}: PropsWithChildren<MainWrapperProps>) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
        gridTemplateRows: '1fr 70% 1fr',
        height: '100%',
        flexGrow: 1,
        gap: 2,
        ...props.sx,
      }}
    >
      {topContent ?? <div></div>}
      <Paper
        {...mainComponenetProps}
        sx={{
          width: '70%',
          height: '100%',
          ...mainComponenetProps?.sx,
        }}
      >
        {children}
      </Paper>
      {bottomContent ?? <div></div>}
    </Box>
  );
};

export default MainWrapper;
