import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';

export default function Routes() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/admin" component={Admin} />
                </Switch>
            </BrowserRouter>
        </>
    );
}