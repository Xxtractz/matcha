import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button, TextField, Select, MenuItem } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  getUserFirstName,
  getUserLastName,
  getUsername,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
} from "../../../actions/user";
// import { WithContext as ReactTags } from 'react-tag-input';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      username_err: "",
      username_err_helperText: "",
      password: "",
      password_err: "",
      password_err_helperText: "",
      isopen: true,
    };
  }

  submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username.toString(),
      password: this.state.password.toString(),
    };
    this.login(user);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  // Form Sections
  nameSection() {
    return (
      <div className="row mb-3">
        <div className="col-6">
          <InputLabel>First Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="fname"
            helperText={this.state.fname_err_helperText}
            error={this.state.fname_err ? true : false}
            value={this.state.fname}
            defaultValue={getUserFirstName()}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
        <div className="col-6 ">
          <InputLabel>Last Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="lname"
            defaultValue={getUserLastName()}
            helperText={this.state.lname_err_helperText}
            error={this.state.lname_err ? true : false}
            value={this.state.lname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
      </div>
    );
  }

  genderSection() {
    return (
      <div className="row mb-3">
        <div className="col-6 text-center">
          <InputLabel>Gender</InputLabel>
          <Select
            native
            value={getUserGender()}
            // onChange={handleChange}
            // inputProps={{
            //   name: "age",
            //   id: "age-native-simple",
            // }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Other"}>Other</option>
            <option value={"Female"}>Female</option>
          </Select>
        </div>
        <div className="col-6 text-center">
          <InputLabel>Preferred Gender</InputLabel>
          <Select
            native
            value={getUserGenderPreference()}
            // onChange={handleChange}
            // inputProps={{
            //   name: "age",
            //   id: "age-native-simple",
            // }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Both"}>Both</option>
            <option value={"Female"}>Female</option>
          </Select>
        </div>
      </div>
    );
  }

  bioSection() {
    return (
      <div className="col-8 text-center">
        {/* <TextField
            className="col-12"
            type="text"
            name="fname"
            // placeholder={getUserFirstName()}
            // helperText={this.state.fname_err_helperText}
            // error={this.state.fname_err ? true : false}
            // value={this.state.fname}
            // onChange={(e) => this.onChange(e)}
            required
          /> */}
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          value={getUserBio()}
        />
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
              <code>(to change username see Account settings)</code>{" "}
            </small>
          </h5>
          <br />
          <form onSubmit={this.submitHandler}>
            <div className="grey-text">
              {/* name Section */}
              {this.nameSection()}

              {/* Gender Section */}
              {this.genderSection()}

              {/* Gender Section*/}
              {/* {this.bioSection()} */}
            </div>
            <div className="text-center p-3">
              <Button variant="contained" type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default UserProfile;
