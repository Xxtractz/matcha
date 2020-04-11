import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isloggedIn } from "./api";
import { getUserStatus } from "./user";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isloggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};
