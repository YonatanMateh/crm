import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Clients from './Clients/clients.component';
import Analytics from './analytics.component';
import Actions from './actions.component';
import { useStyles } from '../styles/style';
import { Paper } from '@material-ui/core';

const Routes: React.FC = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.appContainer}>
        <Switch>
            <Route exact path="/clients" >
                <Clients />
            </Route>
            <Route exact path="/actions" >
                <Actions />
            </Route>
            <Route exact path="/analytics" >
                <Analytics />
            </Route>
            <Route exact path="/">
                <Redirect to="clients" />
            </Route>
        </Switch>
        </Paper>
    )
}

export default Routes;