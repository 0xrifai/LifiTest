import { Box } from '@mui/material';
import { ActiveTransactions } from '../../components/ActiveTransactions';
import { AmountInput } from '../../components/AmountInput';
import { ContractComponent } from '../../components/ContractComponent';
import { GasRefuelMessage } from '../../components/GasMessage';
import { Routes } from '../../components/Routes';
import { SelectChainAndToken } from '../../components/SelectChainAndToken';
import {
  SendToWallet,
  SendToWalletButton,
} from '../../components/SendToWallet';
import { useExpandableVariant } from '../../hooks';
import { useWidgetConfig } from '../../providers';
import { MainGasMessage } from './MainGasMessage';
import { FormContainer } from './MainPage.style';
import { ReviewButton } from './ReviewButton';

interface ActiveTransactionsProps {
  toggleOpenTransac: () => void
}

export const MainPage: React.FC<ActiveTransactionsProps> = ({toggleOpenTransac}) => {
  const expandable = useExpandableVariant();
  const { subvariant, contractComponent } = useWidgetConfig();
  const nft = subvariant === 'nft';
  return (
    <FormContainer disableGutters>
      <ActiveTransactions toggleOpenTransac={toggleOpenTransac} />
      {nft ? (
        <ContractComponent mt={1} mb={1}>
          {contractComponent}
        </ContractComponent>
      ) : null}
      <SelectChainAndToken mt={1} mb={2} />
      {!nft ? <AmountInput formType="from" mb={2} /> : null}
      {!expandable ? <Routes mb={2} /> : null}
      <SendToWallet mb={2} />
      <GasRefuelMessage mb={2} />
      <MainGasMessage mb={2} />
      <Box display="flex" mb={1}>
        <ReviewButton />
        <SendToWalletButton />
      </Box>
    </FormContainer>
  );
};
