import DeleteIcon from '@mui/icons-material/DeleteOutline';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  Typography
} from '@mui/material';
import type { Breakpoint } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveTransactionItem } from '../../components/ActiveTransactions';
import { Dialog } from '../../components/Dialog';
import { useWallet } from '../../providers';
import {
  useExecutingRoutesIds,
  useHeaderStoreContext,
  useRouteExecutionStore,
} from '../../stores';
import { ActiveTransactionsEmpty } from './ActiveTransactionsEmpty';
import { Collapse } from '@mui/material';
import { backdropProps, modalProps, paperProps } from '../../components/Dialog';
import CloseIcon from '@mui/icons-material/Close';

interface ContentProps {
  toggleOpenTransac: () => void
}

export const Content = ({toggleOpenTransac} : ContentProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { account } = useWallet();
  const executingRoutes = useExecutingRoutesIds(account.address);
  const deleteRoutes = useRouteExecutionStore((store) => store.deleteRoutes);
  const headerStoreContext = useHeaderStoreContext();
  const [open, setOpen] = useState(false);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  useEffect(() => {
    if (executingRoutes.length) {
      return headerStoreContext.getState().setAction(
        <IconButton size="medium" edge="end" onClick={toggleDialog}>
          <DeleteIcon />
        </IconButton>,
      );
    }
  }, [executingRoutes.length, headerStoreContext, toggleDialog]);

  if (!executingRoutes.length) {
    return <ActiveTransactionsEmpty />;
  }

  return (
    <>
      <Header toggleOpenTransac={toggleOpenTransac}/>
      <Box 
        sx={{
          marginTop: 1,
          // maxHeight: '33rem',
          // minWidth: '22rem',
          [theme.breakpoints.up('xs' as Breakpoint)]: {
            height: 'calc(100% - 80px)',
          },
          [theme.breakpoints.up('tablet' as Breakpoint)]: {
            minWidth: '17rem',
            height: 'calc(100% - 90px)',
          },
          [theme.breakpoints.up('md' as Breakpoint)]: {
            minWidth: '22rem',
            height: 'calc(100% - 100px)',
          },
          overflowY: 'auto',
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
        {executingRoutes.map((routeId) => (
          <ActiveTransactionItem key={routeId} routeId={routeId} toggleOpenTransac={toggleOpenTransac}/>
        ))}
      </Box>
      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>{t('warning.title.deleteActiveTransactions')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('warning.message.deleteActiveTransactions')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>{t('button.cancel')}</Button>
          <Button
            variant="contained"
            onClick={() => deleteRoutes('active')}
            autoFocus
          >
            {t('button.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface ActiveTransactionsProps {
  openTransac: boolean;
  toggleOpenTransac: () => void
}
export function ActiveTransactions({openTransac, toggleOpenTransac}: ActiveTransactionsProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));
  
  return isDesktop ? (
    <Collapse 
      timeout={{enter: 225, exit: 225, appear: 0 }} 
      in={!!openTransac} 
      orientation="horizontal"
      sx={{
        height: '40rem',
        paddingX: '20px',
        position: 'sticky',
        top: '70px',
        '&.MuiCollapse-hidden': {
          display: 'none'
        }
      }}
    >
      <Content toggleOpenTransac={toggleOpenTransac}/>
    </Collapse>
  ) : (
    <Drawer
      anchor="bottom"
      open={openTransac}
      onClose={toggleOpenTransac}
      PaperProps={{
        ...paperProps,
        style: {
          height: '60vh'
        }
      }}
      ModalProps={modalProps}
      BackdropProps={backdropProps}
      disableAutoFocus
    >
      <Content toggleOpenTransac={toggleOpenTransac}/>
    </Drawer>
  );
}

interface HeaderProps {
  toggleOpenTransac: () => void
}
export function Header({toggleOpenTransac}: HeaderProps) {
  return (
    <>
      <Box 
        px={'20px'}
        py={'12px'}
        display="flex" 
        justifyContent={'space-between'} 
        alignItems={'center'}
        borderBottom={'1px solid'}
        borderColor={'#4242423d'}
      >
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
          onClick={toggleOpenTransac}
          sx={{
            marginRight: -1.25,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </>
  );
}