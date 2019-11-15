import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';

export default function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Admin} />
            </Switch>
        </>
    );
}