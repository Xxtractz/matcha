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

          <Layout>
            <Search></Search>
              {getActive() === 1 ? (
            <Profiles></Profiles>  ) : (
                <div className={'m-5'}>
                    <h3>{"You need to complete your Profile, please navigate to account to complete you profile"}</h3>
                </div>

              )}
          </Layout>

      </div>
    );
  }
}

export default index;
