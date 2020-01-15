import React, { Component } from 'react';

// Components
import Layout from './Layout/layout'
import Profiles from './Home/profiles';
import Search from './Home/search';

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
