import React, { Component } from 'react';

// Components
import Layout from '../components/Layout/layout'
import Profiles from '../components/Home/profiles';
import Search from '../components/Home/search';

class index extends Component {
    render() {
        return (
            <Layout>
                <Search></Search>
                <Profiles></Profiles>
            </Layout>
        )
    }
}

export default index;
