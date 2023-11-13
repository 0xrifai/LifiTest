import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import { useSettingsStore } from '../../stores';
import { ListItemButton, ListItemText } from './EnabledToolsButton.style';

export const EnabledToolsButton: React.FC<{
  type: 'Bridges' | 'Exchanges';
  handleClick: () => void;
}> = ({ type, handleClick }) => {
  const { t } = useTranslation();
  const [enabledTools, tools] = useSettingsStore((state) => {
    const enabledTools = Object.values(state[`_enabled${type}`] ?? {});
    return [enabledTools.filter(Boolean).length, enabledTools.length];
  }, shallow);

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemText primary={t(`settings.enabled${type}`)} />
      <Box display="flex" alignItems="center">
        <ListItemText primary={`${enabledTools}/${tools}`} />
        <ChevronRightIcon />
      </Box>
    </ListItemButton>
  );
};
