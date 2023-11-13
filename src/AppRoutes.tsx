import { useRoutes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { ActiveTransactionsPage } from './pages/ActiveTransactionsPage';
import { MainPage } from './pages/MainPage';
import { RoutesPage } from './pages/RoutesPage';
import { SelectChainPage } from './pages/SelectChainPage';
import { SelectTokenPage } from './pages/SelectTokenPage';
import { SelectWalletPage } from './pages/SelectWalletPage';
import { TransactionDetailsPage } from './pages/TransactionDetailsPage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { TransactionPage } from './pages/TransactionPage';
import { navigationRoutes } from './utils';

interface ActiveTransactionsProps {
  toggleOpenTransac: () => void
}

export const AppRoutes = ({toggleOpenTransac}:ActiveTransactionsProps) => {
  const element = useRoutes([
    {
      path: '/',
      element: <MainPage toggleOpenTransac={toggleOpenTransac} />,
    },
    {
      path: navigationRoutes.fromToken,
      element: <SelectTokenPage formType="from" />,
    },
    {
      path: navigationRoutes.toToken,
      element: <SelectTokenPage formType="to" />,
    },
    {
      path: navigationRoutes.toTokenNative,
      element: <SelectChainPage formType="to" selectNativeToken />,
    },
    {
      path: `${navigationRoutes.fromToken}?/${navigationRoutes.fromChain}`,
      element: <SelectChainPage formType="from" />,
    },
    {
      path: `${navigationRoutes.toToken}?/${navigationRoutes.toChain}`,
      element: <SelectChainPage formType="to" />,
    },
    {
      path: navigationRoutes.routes,
      element: <RoutesPage />,
    },
    // {
    //   path: navigationRoutes.activeTransactions,
    //   element: <ActiveTransactionsPage />,
    // },
    {
      path: navigationRoutes.transactionHistory,
      element: <TransactionHistoryPage />,
    },
    {
      path: `${navigationRoutes.transactionHistory}?/${navigationRoutes.routes}?/${navigationRoutes.transactionExecution}?/${navigationRoutes.transactionDetails}`,
      element: <TransactionDetailsPage />,
    },
    {
      path: `${navigationRoutes.routes}?/${navigationRoutes.transactionExecution}?/${navigationRoutes.selectWallet}`,
      element: <SelectWalletPage />,
    },
    {
      path: `${navigationRoutes.routes}?/${navigationRoutes.activeTransactions}?/${navigationRoutes.transactionExecution}`,
      element: <TransactionPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return element;
};
