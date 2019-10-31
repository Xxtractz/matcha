import React, {Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Login from './user/login';

class App extends Component {
    render(){
        return (
            <Router>
                <Route exact path='/login' component={Login}/>
            </Router>
        )
    }
}

export default  App;