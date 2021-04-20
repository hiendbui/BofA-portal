import React from 'react';
import { AuthRoute, ProtectedRoute, AdminRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/landing';
import NavBar from './navbar/navbar';
import Main from './main/main';
import ContentExplore from './content/content_explore';



const App = () => (
  <div>
    <ProtectedRoute path="/" component={NavBar} />
    <Switch>
        <AdminRoute exact path="/admin" component={ContentExplore} />
        <ProtectedRoute exact path="/portal" component={Main} />
      <AuthRoute exact path="/" component={Landing} />
    </Switch>
  </div>
);

export default App;