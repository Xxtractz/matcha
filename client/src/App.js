import React, {Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Login from './user/login';
import Register from './user/register';

class App extends Component {
    render(){
        return (
            <Router>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </Router>
        )
    }
}

export default  App;