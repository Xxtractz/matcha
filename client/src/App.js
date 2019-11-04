import React, {Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

// Pages
import Home from './pages'
import Login from './pages/login';
import Register from './pages/register';

class App extends Component {
    render(){
        return (
            <div>
            <Router>
                <Route exact path="/" component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </Router>
            </div>
        )
    }
}

export default  App;