import React, { Component } from "react";

// Components
import Layout from "../Layout/layout";
import Profiles from "./HomeComponents/profiles";
import Search from "./HomeComponents/search";
import {getActive} from "../../actions/user";

class index extends Component {
  render() {
    return (
      <div>
        {getActive() === 1 ? (
          <Layout>
            <Search></Search>
            <Profiles></Profiles>
          </Layout>
        ) : (
          this.props.history.push(`/user`)
        )}
      </div>
    );
  }
}

export default index;
