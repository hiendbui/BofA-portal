import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
        // Redirect to the home page if the user is authenticated
      <Redirect to="/portal" />
    )
  )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn  ? (
        <Component {...props} />
      ) : (
        // Redirect to the main page if the user is not logged in 
        <Redirect to="/" />
      )
    }
  />
);

const Admin = ({ component: Component, loggedIn, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn && isAdmin ? (
        <Component {...props} />
      ) : (
        // Redirect to the main page if the user is not logged in or not admin
        <Redirect to="/" />
      )
    }
  />
);

// Use the isAuthenitcated slice of state to determine whether a user is logged in

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    isAdmin: state.session.user.username === 'admin'
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const AdminRoute = withRouter(connect(mapStateToProps)(Admin));