import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Button, Switch } from "@material-ui/core";
import {getNotify} from "../../../actions/user";
// import { getUserName, getUserLastName } from "../../../actions/user";

class Settings extends Component {
  // Form Sections
  notifictaionSection() {
    return (
        <div className="row">
            <div className="col-12 text-center">
            Notifications : OFF
            <Switch color="primary" checked={getNotify()} disabled/> ON
            </div>
        </div>
    );
  }

  render() {
    return (
      <Paper className="container p-2 mt-4 col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center " variant="outlined">
          <h1>Setting</h1>
          <small>Account Settings </small>
        </Paper>
        <div className="p-2 mt-4 col-8 mx-auto">
            <div className="grey-text">
              {/* Noticication Section */}
              {this.notifictaionSection()}

            </div>
            <div className="text-center p-3">
              <Button variant="outlined" color="primary" type="submit" href="/user#updateSettings">
                Update
              </Button>
            </div>
        </div>
      </Paper>
    );
  }
}

export default Settings;
