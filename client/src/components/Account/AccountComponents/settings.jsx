import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
// import { getUserName, getUserLastName } from "../../../actions/user";

class Settings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  submitHandler = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  // Form Sections
  notifictaionSection() {
    return "All Notifications settings will be set here";
  }

  privacySection() {
    return "privacy section (Visibility related  and blocking of users goes here)";
  }
  render() {
    return (
      <Paper className="container p-2 mt-4 col-12">
        <Paper className="col-12 mt-2 p-1 text-center " variant="outlined">
          <h1>Setting</h1>
          <small>Account Seetings </small>
        </Paper>
        <div className="p-2 mt-4 col-8 mx-auto">
          <form onSubmit={this.submitHandler}>
            <div className="grey-text">
              {/* Noticication Section */}
              {this.notifictaionSection()}

              {/* Privacy Section */}
              {this.privacySection()}
            </div>
            <div className="text-center p-3">
              <Button variant="contained" type="submit" href="/user#updateSettings">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default Settings;
