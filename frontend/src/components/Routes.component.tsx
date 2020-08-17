import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Clients from './Clients/clients.component';
import Analytics from './analytics.component';
import Actions from './actions/actions.component';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/clients" >
                <Clients />
            </Route>
            <Route  path="/actions" >
                <Actions />
            </Route>
            <Route  path="/analytics" >
                <Analytics />
            </Route>
            <Route exact path="/">
                <Redirect to="clients" />
            </Route>
        </Switch>
    )
}

export default Routes;