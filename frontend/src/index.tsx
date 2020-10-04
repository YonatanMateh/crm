import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { stores, StoresContext } from "./stores/stores";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faChartLine, faUserCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faChartLine, faUserCircle, faGlobeAmericas)


ReactDOM.render(
  <React.Fragment>
    <Router>
      <StoresContext.Provider value={stores}>
        <App />
      </StoresContext.Provider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
