import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Produto from './pages/Admin/Produto';

export default function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/produtos" component={Produto} />
                <Route 
                    path="/admin" 
                    render={({ match: { url } }) => (
                        <>
                          <Route path={`${url}/`} component={Admin} exact />
                          <Route path={`${url}/produto`} component={Produto} />
                        </>
                      )}
                />
            </Switch>
        </>
    );
}