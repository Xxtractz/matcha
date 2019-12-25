import React, {Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route,
    Switch,
    Redirect
 } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages'
import Login from './pages/user/login';
import Register from './pages/user/register';
import NotFound from './pages/404';

// Modified Route 
import {PrivateRoute} from './middleware/private.route';
import {PublicRoute} from './middleware/public.route'

class App extends Component {
    render(){
        return (
            <div>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PublicRoute exact path="/login" component={Login}/>
                    <PublicRoute exact path="/register" component={Register}/>
                    <Route exact path="/404" component={NotFound}/>
                    <Redirect to="/404" />
                </Switch>
            </Router>
            </div>
        )
    }
}

export default  App;