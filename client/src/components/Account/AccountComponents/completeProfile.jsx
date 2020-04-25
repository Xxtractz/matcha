import React, { Component } from "react";
import { Paper } from "@material-ui/core";

class CompleteProfile extends Component {
  render() {
    return (
      <Paper className="container p-2  col-12" variant="outlined">
        <Paper
          className="col-12 mt-2 p-1 text-center"
          variant="outlined"
        >
            <h1>Complete Profile</h1>
          <small>
            {" "}
            Please Complete you Profile
          </small>
        </Paper>
      </Paper>
    );
  }
}

export default CompleteProfile;
