import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUsername,
} from "../../../actions/user";

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
        <div className="col-6 text-center">
          <TextField
            className="col-12"
            type="text"
            name="fname"
            placeholder={getUserFirstName()}
            helperText={this.state.fname_err_helperText}
            error={this.state.fname_err ? true : false}
            value={this.state.fname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
        <div className="col-6 text-center">
          <TextField
            className="col-12"
            type="text"
            name="lname"
            placeholder={getUserLastName()}
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
          <form onSubmit={this.submitHandler}>
            <div className="grey-text">
              {/* name Section */}
              {this.nameSection()}
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
