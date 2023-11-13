import React, { useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Dialog, Drawer, useMediaQuery, useTheme } from '@mui/material';
import type { Breakpoint } from '@mui/material';
import { useGetScrollableContainer } from '../../hooks';
import { backdropProps, modalProps, paperProps } from '../Dialog';
import type { BottomSheetBase, BottomSheetProps } from './types';

// eslint-disable-next-line react/display-name
export const BottomSheet = forwardRef<BottomSheetBase, BottomSheetProps>(({
  elementRef,
  children,
  open: propOpen = false,
  onClose,
}, ref) => {
  const getContainer = useGetScrollableContainer();
  const openRef = useRef(propOpen);
  const [drawerOpen, setDrawerOpen] = useState(propOpen);
  
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));

  const close = useCallback(() => {
    setDrawerOpen(false);
    openRef.current = false;
    onClose?.();
  }, [onClose]);

  useImperativeHandle(
    ref,
    () => ({
      isOpen: () => openRef.current,
      open: () => {
        setDrawerOpen(true);
        openRef.current = true;
      },
      close,
    }),
    [close],
  );

  return (
    <>
      {!isDesktop ? (
        <Drawer
          // container={getContainer}
          ref={elementRef}
          anchor="bottom"
          open={drawerOpen}
          onClose={close}
          ModalProps={modalProps}
          PaperProps={paperProps}
          BackdropProps={backdropProps}
          disableAutoFocus
        >
          {children}
        </Drawer>
      ) : (
        <Dialog
          // container={getContainer}
          ref={elementRef}
          open={drawerOpen}
          onClose={close}
          PaperProps={paperProps}
          BackdropProps={backdropProps}
          disableAutoFocus
        >
          {children}
        </Dialog>
      )}
    </>
  );
});
