import React, { useCallback, useState } from 'react';
import { Drawer, Box, IconButton, Typography, useTheme, useMediaQuery, Stack } from '@mui/material';
import type { SxProps, Theme, Breakpoint } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { ColorSchemeButtonGroup } from './ColorSchemeButtonGroup';
import { EnabledToolsButton } from './EnabledToolsButton';
import { GasPriceSelect } from './GasPriceSelect';
import { LanguageSelect } from './LanguageSelect';
import { ResetSettingsButton } from './ResetSettingsButton';
import { RoutePrioritySelect } from './RoutePrioritySelect';
import { ShowDestinationWallet } from './ShowDestinationWallet';
import { SlippageInput } from './SlippageInput';
import { Dialog } from '../../components/Dialog';
import { backdropProps, modalProps, paperProps } from '../../components/Dialog';
import { SelectEnabledTools } from '../SelectEnabledTools';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface ContentProps {
  toggleDialog: () => void;
}

export function Content({ toggleDialog }: ContentProps) {
  const theme = useTheme();
  const [screen, setScreen] = useState<"base" | "sBridges" | "sExchanges">("base");
  return (
    <>
      <Header 
        toggleDialog={toggleDialog} 
        screen={screen} 
        onBack={() => {
          setScreen("base");
        }}
      />
      <Box 
        sx={{
          overflowY: 'auto', 
          maxHeight: '60vh',
          paddingX: '20px',
          paddingY: '20px',
          '&::-webkit-scrollbar': {
            width: '0'
          },
          [theme.breakpoints.up('sm' as Breakpoint)]: {
            '&:hover::-webkit-scrollbar': {
              width: '10px'
            },
          },
          '&::-webkit-scrollbar-track': {
            background: 'none'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4242423d',
            borderRadius: 20
          },
        }}
      >
      {screen === "sBridges" ? (
        <SelectEnabledTools type="Bridges" />
      ) : screen === "sExchanges" ? (
        <SelectEnabledTools type="Exchanges" />
      ) : (
        <Stack direction={'column'} spacing={2}>
          <ColorSchemeButtonGroup />
          <LanguageSelect />
          <RoutePrioritySelect />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box pr={2} flex={1}>
              <SlippageInput />
            </Box>
            <GasPriceSelect />
          </Box>
          <ShowDestinationWallet />
          <EnabledToolsButton 
            type="Bridges" 
            handleClick={() => {setScreen("sBridges"); }}
          />
          <EnabledToolsButton 
            type="Exchanges" 
            handleClick={() => {setScreen("sExchanges"); }}
          />
          <ResetSettingsButton />
        </Stack>
      )}
      </Box>
    </>
  );
}

interface HeaderProps {
  toggleDialog: () => void;
  onBack?: () => void;
  sx?: SxProps<Theme>
  screen: "base" | "sBridges" | "sExchanges"
}

export function Header({ toggleDialog, onBack, sx, screen }: HeaderProps) {
  return (
    <Box 
      px={'20px'}
      py={'10px'}
      display="flex" 
      justifyContent={'space-between'} 
      alignItems={'center'}
      borderBottom={'1px solid'}
      borderColor={'#4242423d'}
      sx={sx}
    >
      {screen === "base" ? (
        <>
          <Typography
            fontSize={18}
            align={'left'}
            fontWeight="700"
            flex={1}
            noWrap
          >
            Setting
          </Typography>
          <IconButton
            size="medium"
            onClick={toggleDialog}
            sx={{
              marginRight: -1.25,
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            size="medium"
            onClick={onBack}
            sx={{
              background: '#1c1c1e'
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography
            fontSize={18}
            align={'left'}
            fontWeight="700"
            noWrap
            sx={{
              transform: 'translate(-50%, -50%)',
              top: '28px',
              left: '50%',
              position: 'absolute'
            }}
          >
            {screen === "sBridges" ? 'Bridges' : screen === "sExchanges" && 'Exchanges'}
          </Typography>
        </>
      )}
    </Box>
  );
}

export const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));
  
  return (
    <>
      <IconButton
        size="medium"
        onClick={toggleDialog}
        sx={{
          marginRight: -1.25,
        }}
      >
        <SettingsIcon />
      </IconButton>
      {!isDesktop ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={toggleDialog}
          ModalProps={modalProps}
          PaperProps={paperProps}
          BackdropProps={backdropProps}
          disableAutoFocus
        >
          <Content toggleDialog={toggleDialog} />
        </Drawer>
      ) : (
      <Dialog
        open={open}
        onClose={toggleDialog}
        PaperProps={paperProps}
      >
        <Content toggleDialog={toggleDialog} />
      </Dialog>
      )}
    </>
  );
};
