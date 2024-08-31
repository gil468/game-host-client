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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        height: '100%',
        gap: 2,
        ...props.sx,
      }}
    >
      <Box flex="0 1 auto">{topContent ?? <div></div>}</Box>
      <Paper
        {...mainComponenetProps}
        sx={{
          width: '70%',
          height: '100%',
          flex: '1',
          ...mainComponenetProps?.sx,
        }}
      >
        {children}
      </Paper>
      <Box marginBottom={1} flex="0 1 auto">
        {bottomContent ?? <div></div>}
      </Box>
    </Box>
  );
};

export default MainWrapper;
