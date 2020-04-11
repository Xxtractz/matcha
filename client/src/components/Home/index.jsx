import React, { Component } from "react";

// Components
import Layout from "../Layout/layout";
import Profiles from "./HomeComponents/profiles";
import Search from "./HomeComponents/search";
import { getUserStatus } from "../../actions/user";

class index extends Component {
  render() {
    return (
      <div>
        {getUserStatus() === "2" ? (
          <Layout>
            <Search></Search>
            <Profiles></Profiles>
          </Layout>
        ) : (
          this.props.history.push(`/user#incomplete`)
        )}
      </div>
    );
  }
}

export default index;
