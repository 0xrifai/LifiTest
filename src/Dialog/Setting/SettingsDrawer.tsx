import React from 'react';
import { Box, Drawer, IconButton, useTheme, useMediaQuery } from '@mui/material';
import type { Breakpoint } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ColorSchemeButtonGroup } from './ColorSchemeButtonGroup';
import { EnabledToolsButton } from './EnabledToolsButton';
import { GasPriceSelect } from './GasPriceSelect';
import { LanguageSelect } from './LanguageSelect';
import { ResetSettingsButton } from './ResetSettingsButton';
import { RoutePrioritySelect } from './RoutePrioritySelect';
import { ShowDestinationWallet } from './ShowDestinationWallet';
import { SlippageInput } from './SlippageInput';
import { backdropProps, modalProps, paperProps } from '../../components/Dialog';
import { useGetScrollableContainer } from '../../hooks/useScrollableContainer';

export const SettingsDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getContainer = useGetScrollableContainer();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));
  
  return (
    <>
      <IconButton
        size="medium"
        onClick={handleOpen}
        sx={{
          marginRight: -1.25,
        }}
      >
        <SettingsIcon />
      </IconButton>
      
      <Drawer
        // container={getContainer}
        anchor={isDesktop ? "right" : "bottom"}
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            top: '75px',
            right: '37px',
            position: 'absolute',
            backgroundImage: 'none',
            background: '#121212',
            height: 'calc(100% - 90px)',
            maxWidth: '380px',
            border: '1px solid #262830',
            borderTopLeftRadius: isDesktop ? '10px' : '10px',
            borderTopRightRadius: isDesktop ? '10px' : '10px',
            borderBottomLeftRadius: isDesktop ? '10px' : '0',
            borderBottomRightRadius: isDesktop ? '10px' : '0' 
          },
        }}
        hideBackdrop
      >
        <Box py={3}>
          <Box px={3}>
            <ColorSchemeButtonGroup />
            <LanguageSelect />
            <RoutePrioritySelect />
            <Box sx={{ display: 'flex', alignItems: 'center' }} mt={2}>
              <Box pr={2} flex={1}>
                <SlippageInput />
              </Box>
              <GasPriceSelect />
            </Box>
          </Box>
          <ShowDestinationWallet />
          <Box px={1.5}>
            <EnabledToolsButton type="Bridges" />
            <EnabledToolsButton type="Exchanges" />
          </Box>
          <ResetSettingsButton />
        </Box>
      </Drawer>
    </>
  );
};
