import React, {Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route,
    Switch,
    Redirect
 } from 'react-router-dom';

import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './components'
import Login from './components/login';
import Register from './components/register';
import Account from "./components/account";
import NotFound from './components/404';

// Modified Route 
import {PrivateRoute} from './actions/private.route';
import {PublicRoute} from './actions/public.route'

class App extends Component {
    render(){
        return (
            <div>
                <Router>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/user" component={Account} />
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