import React, { Component } from "react";
import { Paper } from "@material-ui/core";

class CompleteProfile extends Component {
  render() {
    return (
      <Paper
        className="container p-2  bg-transparent col-12"
        variant="outlined"
        square
      >
        <Paper
          className="col-12 mt-2 p-1 text-center bg-transparent"
          variant="outlined"
        >
          <h1>Complete Profile</h1>
          <small> Please Complete you Profile</small>
        </Paper>

        <div className="container p-2">
          <div className="col-12 ">
            <div className="row">
              <img className="img-thumbnail" src="src/assets/images/addImage.png" alt="imagr"  style={{width: "150px", height: "150px"}} />
              <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" />
              <input type="file" name="file"/>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default CompleteProfile;
