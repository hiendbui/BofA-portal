import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/landing';
import NavBar from './navbar/navbar';
import Main from './main/main';



const App = () => (
  <div>
    <ProtectedRoute path="/" component={NavBar} />
    <Switch>
        <ProtectedRoute path="/portal" component={Main} />
        <AuthRoute exact path="/" component={Landing} />
    </Switch>
  </div>
);

export default App;