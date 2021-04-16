import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import NavBar from './navbar/navbar';



const App = () => (
  <div>
    <ProtectedRoute path="/" component={NavBar} />
    <Switch>
        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;