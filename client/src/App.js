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
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/404';

// APrivate Route 
import {PrivateRoute} from './middleware/private-route';

class App extends Component {
    render(){
        return (
            <div>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/404" component={NotFound}/>
                    <Redirect to="/404" />
                </Switch>
            </Router>
            </div>
        )
    }
}

export default  App;