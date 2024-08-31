import { PropsWithChildren, ReactNode } from 'react';
import { Paper, Box, BoxProps, PaperProps, Stack } from '@mui/material';

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
        width: '100%',
        gap: 2,
        ...props.sx,
      }}
    >
      <Stack width={'100%'} alignItems={'center'} flex="0 1 auto">
        {topContent ?? <div></div>}
      </Stack>
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
      <Stack
        width={'100%'}
        alignItems={'center'}
        marginBottom={1}
        flex="0 1 auto"
      >
        {bottomContent ?? <div></div>}
      </Stack>
    </Box>
  );
};

export default MainWrapper;
