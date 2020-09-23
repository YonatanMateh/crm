import React from 'react';
import { Switch, Route } from "react-router-dom";
import Clients from '../pages/Clients.component';
import Analytics from '../pages/Analytics.component';
import Actions from '../pages/Actions.component';

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
        </Switch>
    )
}

export default Routes;