import React, { Component } from "react";
import Layout from "../Layout/layout";
import { getUserStatus } from "../../actions/user";
import { Redirect } from "react-router-dom";

class Messages extends Component {
  render() {
    return (
      <div>
        {getUserStatus() === "2" ? (
          <Layout>Chat side</Layout>
        ) : (
          this.props.history.push(`/user#incomplete`)
        )}
      </div>
    );
  }
}

export default Messages;
