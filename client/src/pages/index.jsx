import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
// Components
import Nav from '../components/nav';
import {PrivateRoute} from '../middleware/private.route';
import Account from './user/account';

class index extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <div className="content">
                    <Router>
                        <PrivateRoute exact path="/user" component={Account} />
                    </Router>
                </div>
            </div>
        )
    }
}

export default index;
