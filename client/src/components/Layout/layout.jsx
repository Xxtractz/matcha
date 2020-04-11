import React from "react";
import Nav from "./nav";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Nav></Nav>
        <div className="content">
          <main>{this.props.children}</main>
        </div>
      </div>
    );
  }
}

export default Layout;
