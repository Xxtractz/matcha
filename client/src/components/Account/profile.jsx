import React, { Component } from 'react';
import {Paper} from "@material-ui/core";


class UserProfile extends Component {
  render() {
    return (
      <Paper className="container p-2 mt-4 col-12">
        <Paper className="col-12 mt-2 p-1 text-center bg_gradient" variant="elevation">
            <h1>Profile</h1>
            <small> Details about you </small>
          </Paper>
      </Paper>
    );
  }
}

export default UserProfile;
