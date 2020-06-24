import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { getUserLastName } from "../../../actions/user";

class AuthDetails extends Component {
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
  emailSection() {
    return (
      <div className="row mb-3">
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

  usernameSection() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            type="text"
            name=""
            label="Username"
            helperText={this.state.username_err_helperText}
            error={this.state.username_err ? true : false}
            value={this.state.username}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="username"
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
          <small>Account Information </small>
        </Paper>
        <div className="p-2 mt-4 col-8 mx-auto">
          <form onSubmit={this.submitHandler}>
            <div className="grey-text">
              {/* Username Section */}
              {this.usernameSection()}
            </div>
            <div className="text-center p-3">
              <Button variant="outlined" color="primary" type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default AuthDetails;
