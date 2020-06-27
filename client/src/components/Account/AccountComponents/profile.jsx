import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUsername,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
  getUserInterest,
} from "../../../actions/user";

class UserProfile extends Component {
  nameSection() {
    return (
      <div className="row mb-3">
        <div className="col-6">
          <InputLabel>First Name</InputLabel>
          {getUserFirstName()}
        </div>
        <div className="col-6 ">
          <InputLabel>Last Name</InputLabel>
          {getUserLastName()}
        </div>
      </div>
    );
  }

  genderSection() {
    return (
      <div className="row mb-3">
        <div className="col-6 ">
          <InputLabel>Gender</InputLabel>
          {getUserGender()}
        </div>
        <div className="col-6 ">
          <InputLabel>Preferred Gender</InputLabel>
          {getUserGenderPreference()}
        </div>
      </div>
    );
  }

  bioSection() {
    return (
      <div className="row mb-3">
        <div className="col-12">
          <InputLabel>Bio</InputLabel>
          <p>{getUserBio()}</p>
        </div>
      </div>
    );
  }

  interestSection() {
    return (
      <div className=" row mb-3">
        <div className="col-10    ">
          <InputLabel>Interests</InputLabel>
          <p>{getUserInterest().toString()}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Paper className="container p-2 mt-4 col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center" variant="outlined">
          <h1>Profile</h1>
          <small> Details about you </small>
        </Paper>
        <div className="p-2 mt-4 col-8 mx-auto">
          <h5>
            Hi,{getUsername()}{" "}
            <small>
              <code>(to change username,password and email see Account settings)</code>{" "}
            </small>
          </h5>
          <br />
          <div className="grey-text">
            {/* name Section */}
            {this.nameSection()}
            <hr />

            {/* Gender Section */}
            {this.genderSection()}
            <hr />

            {this.interestSection()}
            <hr />

            {this.bioSection()}
            <hr />
          </div>
          <div className="text-center p-3">
              <Button variant="outlined" color="primary"type="submit" href="/user#updateProfile">
                  Update
              </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

export default UserProfile;
