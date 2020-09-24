import React from 'react';
import { observer } from "mobx-react";
import { ThemeProvider } from '@material-ui/core';

import { theme } from './theme/theme';
import NavigationBar from './components/NavigationBar.component';
import Routes from './components/Routes.component';
  
const App = observer(() => {
 
  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <Routes />
    </ThemeProvider>
  );
})

export default App;
