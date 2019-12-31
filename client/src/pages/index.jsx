import React, { Component } from 'react';

// Components
import Layout from '../components/Layout/layout'
import Profiles from '../components/Home/profiles';
import Tips from '../components/Home/tips';

class index extends Component {
    render() {
        return (
            <Layout>
                <Profiles></Profiles>
                <Tips></Tips>
            </Layout>
        )
    }
}

export default index;
