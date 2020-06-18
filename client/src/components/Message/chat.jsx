import React, { Component } from "react";
import Layout from "../Layout/layout";
import {getActive} from "../../actions/user";

class Messages extends Component {
  display() {
    return <div>Chat Content</div>;
  }

  render() {
    return (
      <div>
        {getActive() === 1 ? (
          <Layout>{this.display()}</Layout>
        ) : (
          this.props.history.push(`/user`)
        )}
      </div>
    );
  }
}

export default Messages;
