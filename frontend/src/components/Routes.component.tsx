import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Clients from './clients.component';
import Analytics from './analytics.component';
import Actions from './actions.component';

const Routes: React.FC = () => {
    return (
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
    )
}

export default Routes;