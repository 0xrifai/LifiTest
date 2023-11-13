import type { BoxProps } from '@mui/material';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../providers';
import { useExecutingRoutesIds } from '../../stores';
import { navigationRoutes } from '../../utils';
import { Card, CardTitle } from '../Card';
import { ActiveTransactionItem } from './ActiveTransactionItem';
import { ShowAllButton } from './ActiveTransactions.style';

interface ActiveTransactionsProps {
  toggleOpenTransac: () => void
}

export const ActiveTransactions: React.FC<ActiveTransactionsProps> = ({toggleOpenTransac}) => {
  const { t } = useTranslation();
  const { account } = useWallet();
  const executingRoutes = useExecutingRoutesIds(account.address);

  if (!executingRoutes?.length) {
    return null;
  }
  const hasShowAll = executingRoutes?.length > 2;

  return (
    <Card variant="selected" selectionColor="secondary" mt={1} mb={1}>
      <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
        <CardTitle noWrap width={'100%'}>{t('header.activeTransactions')}</CardTitle>
        {hasShowAll ? (
          <ShowAllButton disableRipple onClick={toggleOpenTransac}>
            {t('button.showAll')}
          </ShowAllButton>
        ) : null}
      </Stack>
      <Stack spacing={1.5} py={2}>
        {executingRoutes.slice(0, 2).map((routeId) => (
          <ActiveTransactionItem key={routeId} routeId={routeId} dense />
        ))}
      </Stack>
      
    </Card>
  );
};
