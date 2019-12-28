import React, { Component } from 'react';

// Components
import Layout from '../components/Layout/layout'
import Profiles from '../components/Home/profiles';
class index extends Component {
    render() {
        return (
            <Layout>
                <Profiles></Profiles>
            </Layout>
        )
    }
}

export default index;
