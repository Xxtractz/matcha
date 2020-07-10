import React, { Component } from "react";

// Components
import Layout from "../Layout/layout";
import Profiles from "./HomeComponents/profiles";

class index extends Component {
  render() {
    return (
      <div>

          <Layout>
            <Profiles></Profiles>
          </Layout>

      </div>
    );
  }
}

export default index;
