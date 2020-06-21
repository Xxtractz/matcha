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
import {getActive} from "../../actions/user";
import CompleteProfile from "./AccountComponents/completeProfile/completeProfile";
import Update from "./AccountComponents/editdetails/update";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen: true,
    };
  }

  displayVerifyError() {
    return (
      <div className="mt-5">
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
            <strong>Profile incomplete</strong>
          </Alert>
        </Collapse>
        {this.displayCompleteProfile()}
      </div>
    );
  }

  displayCompleteProfile() {
    return (
      <div>
        <CompleteProfile></CompleteProfile>
      </div>
    );
  }

  displayUpdate(){
      return (
        <div>
            <Update></Update>
        </div>
      );
  }

  displayProfile(){
      return(
          <div>
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
          </div>
      )
  }

  displayAccount() {
    return (
      <div className='mt-5'>
          {window.location.hash ? this.displayUpdate() :   this.displayProfile()}
      </div>
    );
  }

  render() {
    return (
      <Layout>
        {getActive() !== 1
          ? this.displayVerifyError()
          : this.displayAccount()}
      </Layout>
    );
  }
}

export default Account;
