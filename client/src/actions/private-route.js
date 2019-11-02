import React, { Component } from 'react';
import {Route} from 'react-router-dom;'
import PropTypes from 'prop-types';


const PrivateRoute = ( {component : Component, ...rest}) => {
    <Route {...rest} render={}
    />
};


PrivateRoute.propTypes = {
    
};


export default PrivateRoute;

