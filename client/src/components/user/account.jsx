import React, { Component } from 'react';

import Layout from "../Layout/layout";
import Images from '../Account/images';
import Profile from '../Account/profile';
import AuthDetails from '../Account/authdetails';
import Settings from '../Account/settings';

class Account extends Component {
  render() {
    return (
        <Layout>
            <Images></Images>
            <Profile></Profile>
            <AuthDetails></AuthDetails>
            <Settings></Settings>
        </Layout>
    );
  }
}

export default Account;

