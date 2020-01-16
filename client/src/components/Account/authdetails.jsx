import React, { Component } from 'react';
import {Paper} from "@material-ui/core";

class AuthDetails extends Component {

  changePassword(){

  }


  render() {
    return (
      <Paper className="container p-2 mt-4 col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center bg_gradient" variant="outlined">
          <h1>Login</h1>
          <small>Login Information </small>
        </Paper>
      </Paper>
    );
  }
}

export default AuthDetails;
