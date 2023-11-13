import type { DialogProps, Theme, Breakpoint } from '@mui/material';
import { Dialog as MuiDialog } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { useGetScrollableContainer } from '../hooks';

export const modalProps = {
  sx: {
    position: 'fixed',
    overflow: 'hidden',
  },
};

export const paperProps = {
  sx: (theme: Theme) => ({
    position: 'absolute',
    backgroundImage: 'none',
    background: '#121212',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.up('sm' as Breakpoint)]: { 
      width: '440px' 
    },
  }),
};

export const backdropProps = {
  sx: {
    position: 'absolute',
    backgroundColor: 'rgb(0 0 0 / 32%)',
    backdropFilter: 'blur(5px)',
  },
};

export const Dialog: React.FC<PropsWithChildren<DialogProps>> = ({
  children,
  open,
  onClose,
}) => {
  const getContainer = useGetScrollableContainer();
  return (
    <MuiDialog
      // container={getContainer}
      open={open}
      onClose={onClose}
      sx={modalProps.sx}
      PaperProps={paperProps}
      BackdropProps={backdropProps}
    >
      {children}
    </MuiDialog>
  );
};
