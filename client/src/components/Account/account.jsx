import React, { Component } from 'react';

import Layout from "../Layout/layout";
import Images from './AccountComponents/images';
import Profile from './AccountComponents/profile';
import AuthDetails from './AccountComponents/authdetails';
import Settings from './AccountComponents/settings';

class Account extends Component {
  render() {
    return (
        <Layout>
            <Images></Images>
            <Profile></Profile>
            <div className="row ">
              <div className="col-md">
              <Settings></Settings>
              </div>
              <div className="col-md">
                <AuthDetails></AuthDetails>
              </div>
            </div>
            
            
        </Layout>
    );
  }
}

export default Account;

