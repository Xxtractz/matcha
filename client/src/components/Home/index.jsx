import React, { Component } from "react";

// Components
import Layout from "../Layout/layout";
import Profiles from "./HomeComponents/profiles";
import Search from "./HomeComponents/search";

class index extends Component {
  render() {
    return (
      <Layout>
        <Search></Search>
        <Profiles></Profiles>
      </Layout>
    );
  }
}

export default index;
