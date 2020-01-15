import React, { Component } from 'react';
import {Paper} from "@material-ui/core";

class Settings extends Component {
  render() {
    return (
      <Paper className="container p-2 mt-4 col-12">
        <Paper className="col-12 mt-2 p-1 text-center bg_gradient" variant="elevation">

          <h1>Account Setting</h1>
          <small>Account Seetings </small>
        </Paper>
      </Paper>
    );
  }
}

export default Settings;
