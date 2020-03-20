import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isloggedIn} from "./auth";


export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route 
      {...rest} 
        render={props => {
          if(!isloggedIn()){
            return <Component {...props}/>;
          }
          else{
            return (
              <Redirect
                to={{
                  pathname: "/"
                }}
              />
            );
          }
        }
      } 
    />
  );
};

