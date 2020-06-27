import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import {getUserEmail, getUsername} from "../../../actions/user";
import InputLabel from "@material-ui/core/InputLabel";

class AuthDetails extends Component {
  emailSection() {
    return (
      <div className="row mb-2">
        <div className="col-12 text-center">
          <InputLabel>Email</InputLabel>
          <TextField
            className="col-12"
            type="text"
            value={getUserEmail()}
            disabled
          />
        </div>
      </div>
    );
  }

  usernameSection() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <InputLabel>Username</InputLabel>
          <TextField
            className="col-12"
            type="text"
            value={getUsername()}
            required
            disabled
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Paper className="container p-2 mt-4 col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center " variant="outlined">
          <h1>Account Settings</h1>
            <small>Account Information, <strong>You can update password by clicking UPDATE</strong> </small>
        </Paper>
        <div className="p-2 mt-4 col-8 mx-auto">
            <div className="grey-text">
              {this.emailSection()}
              {this.usernameSection()}
            </div>
            <div className="text-center p-3">
              <Button variant="outlined" color="primary" type="submit" href="/user#UpdateAuthDetails">
                Update
              </Button>
            </div>
        </div>
      </Paper>
    );
  }
}

export default AuthDetails;
