import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isloggedIn } from "./auth";
import { refresh } from "./api";
import { getUsername } from "./user";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} component={(props) => {
        if (isloggedIn()) {
          refresh({ username: getUsername() }).then();
          return (
                <div>
                    <Component {...props} />
                </div>
            );
        } else {
          return (
            <Redirect
              to="/login"
            />
          );
        }
      }}
    />
  );
};

