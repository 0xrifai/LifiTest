import React, { forwardRef, useCallback, useMemo } from 'react';
import type { WidgetDrawer } from './AppDrawer';
import { AppDrawer } from './AppDrawer';
import { AppProvider } from './AppProvider';
import { AppRoutes } from './AppRoutes';
import {
  AppContainer,
  AppExpandedContainer,
  FlexContainer,
} from './components/AppContainer';
import { Header } from './components/Header';
import { Initializer } from './components/Initializer';
import { PoweredBy } from './components/PoweredBy';
import { RoutesExpanded } from './components/Routes';
import { useExpandableVariant } from './hooks';
import { useWidgetConfig } from './providers';
import type { WidgetConfig, WidgetProps } from './types';
import { ElementId, createElementId } from './utils';
import { ActiveTransactions } from './Dialog/ActiveTransactions/ActiveTransactions';

// eslint-disable-next-line react/display-name
export const App = forwardRef<WidgetDrawer, WidgetProps>(
  ({ elementRef, open, integrator, ...other }, ref) => {
    const config: WidgetConfig = useMemo(
      () => ({ integrator, ...other, ...other.config }),
      [integrator, other],
    );
    return config?.variant !== 'drawer' ? (
      <AppProvider config={config}>
        <AppDefault />
      </AppProvider>
    ) : (
      <AppDrawer
        ref={ref}
        elementRef={elementRef}
        integrator={integrator}
        config={config}
        open={open}
      />
    );
  },
);

export const AppDefault = () => {
  const { elementId } = useWidgetConfig();
  const expandable = useExpandableVariant();

  const [openTransac, setOpenTransac] = React.useState(false);
  const toggleOpenTransac = useCallback(() => {
    setOpenTransac((openTransac) => !openTransac);
  }, []);
  
  return (
    <AppExpandedContainer
      id={createElementId(ElementId.AppExpandedContainer, elementId)}
    >
      <ActiveTransactions openTransac={openTransac} toggleOpenTransac={toggleOpenTransac} />
      <AppContainer>
        <Header />
        <FlexContainer disableGutters>
          <AppRoutes toggleOpenTransac={toggleOpenTransac}/>
        </FlexContainer>
        {/* <PoweredBy /> */}
        <Initializer />
      </AppContainer>
      {expandable ? <RoutesExpanded /> : null}
    </AppExpandedContainer>
  );
};
