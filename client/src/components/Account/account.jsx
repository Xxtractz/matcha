import React, { Component } from "react";

import Layout from "../Layout/layout";
import Images from "./AccountComponents/images";
import Profile from "./AccountComponents/profile";
import AuthDetails from "./AccountComponents/authdetails";
import Settings from "./AccountComponents/settings";

class Account extends Component {

  constructor(){
    super();
    
  }

  displayVerifyError() {
    return (
      <Collapse in={this.state.isopen}>
        <Alert
          variant="outlined"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                this.setState({ isopen: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <strong>
            The current Token is invalid, Request for a new verification Token
            Below
          </strong>
        </Alert>
      </Collapse>
    );
  }


  render() {
    return (
      <Layout>
        {this.state.invalidToken === true ? this.displayVerifyError() : ""}
        <Images></Images>
        <Profile></Profile>
        <div className="row ">
          <div className="col-md">
            <Settings></Settings>
          </div>
          <div className="col-md">
            <AuthDetails></AuthDetails>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Account;
