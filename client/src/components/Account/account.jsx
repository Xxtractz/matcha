import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Layout from "../Layout/layout";
import Images from "./AccountComponents/images";
import Profile from "./AccountComponents/profile";
import AuthDetails from "./AccountComponents/authdetails";
import Settings from "./AccountComponents/settings";
import { getUserStatus } from "../../actions/user";

class Account extends Component {

  constructor(){
    super();
    this.state = {
      isopen:true,

    };
  }

  displayVerifyError() {
    return (
      <Collapse in={this.state.isopen}>
        <Alert
          variant="filled"
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
            Profile incomplete
          </strong>
        </Alert>
      </Collapse>
    );
  }


  render() {
    return (
      <Layout>
        {getUserStatus() !== "2" ? this.displayVerifyError() : ""}
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
