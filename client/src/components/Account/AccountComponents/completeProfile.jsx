import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button, TextField, Select } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUsername,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
  getUserInterest,
} from "../../../actions/user";

class CompleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["Input"],
      temptag: "",
      isopen: true,
      firstname: getUserFirstName(),
      lastname: getUserLastName(),
      gender: getUserGender(),
      genderPreference: getUserGenderPreference(),
      interest: getUserInterest(),
    };
  }

  imageSection() {
    return (
      <div className="container p-2">
        <div className="col-12 ">
          <div className="row">
            <img
              className="img-thumbnail"
              src="src/assets/images/addImage.png"
              alt="imagr"
              style={{ width: "150px", height: "150px" }}
            />
            <input
              type="button"
              class="btn btn-secondary"
              id="btnChangePicture"
              value="Change"
            />
            <input type="file" name="file" />
          </div>
        </div>
      </div>
    );
  }
  // Form Sections
  nameSection() {
    return (
      <div className="row mb-3">
        <div className="col-6">
          <InputLabel>First Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="firstname"
            defaultValue={this.state.firstname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
        <div className="col-6 ">
          <InputLabel>Last Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="lastname"
            defaultValue={this.state.lastname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
      </div>
    );
  }

  personalDetailsSection() {
    return (
      <div className="container p-2">
        <div className="col-12">{this.nameSection()}</div>
      </div>
    );
  }

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

        {this.imageSection()}

        {this.personalDetailsSection()}
      </Paper>
    );
  }
}

export default CompleteProfile;
