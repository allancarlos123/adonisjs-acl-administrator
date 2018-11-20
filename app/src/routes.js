import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import App from "./pages/App";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

function VerifyAuth({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/app",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <VerifyAuth exact path="/" component={SignIn} />
      <VerifyAuth path="/register" component={SignUp} />
      <PrivateRoute path="/app" component={App} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;