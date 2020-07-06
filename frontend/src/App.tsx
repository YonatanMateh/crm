import React from 'react';
import { observer } from "mobx-react";
// import { useStore } from "./stores/stores";
import NavigationBar from './components/navigationBar.component';
import { theme } from './theme/theme';
import { ThemeProvider } from '@material-ui/core';
import Routes from './components/routes.component';
// import Routes from './components/routes.component';
const App = observer((props: any) => {
  // const { clientsStore } = useStore()

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <Routes />
    </ThemeProvider>
  );
})

export default App;
