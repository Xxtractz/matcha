import React, { Component } from 'react';

import Layout from "../../components/Layout/layout";
import Images from '../../components/Account/images';
import Profile from '../../components/Account/profile';
import AuthDetails from '../../components/Account/authdetails';
import Settings from '../../components/Account/settings';

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

