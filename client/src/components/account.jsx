import React, { Component } from 'react';

import Layout from "./Layout/layout";
import Images from './Account/images';
import Profile from './Account/profile';
import AuthDetails from './Account/authdetails';
import Settings from './Account/settings';

class Account extends Component {
  render() {
    return (
        <Layout>
            <Images></Images>
            <div className="row ">
              <div className="col-md">
                <Profile></Profile>
              </div>
              <div className="col-md">
                <AuthDetails></AuthDetails>
              </div>
            </div>
            
            <Settings></Settings>
        </Layout>
    );
  }
}

export default Account;

