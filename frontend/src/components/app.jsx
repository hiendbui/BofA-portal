import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/landing';
import NavBar from './navbar/navbar';



const App = () => (
  <div>
    <ProtectedRoute path="/" component={NavBar} />
    <Switch>
        <AuthRoute exact path="/" component={Landing} />
    </Switch>
  </div>
);

export default App;