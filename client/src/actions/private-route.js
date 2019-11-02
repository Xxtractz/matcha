import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom;'
import PropTypes from 'prop-types';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

PrivateRoute.propTypes = {
    
};


export default PrivateRoute;

