import React, { Component } from "react";
import { Button, TextField, Card, CardActions } from "@material-ui/core";
import { Reset } from "../../actions/auth";

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      displayform: false,
      username: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username.toString(),
    };
    this.handleReset(user);
  };

  handleReset(username) {
    Reset(username)
      .then((res) => {
        if (res) {
          if (res === 204) {
            console.log("Username Doesn't Exist");
          }
          if (res === 200) {
            window.location.replace("/login");
          } else {
            console.log(res);
          }
        } else {
          console.log("Server is Offline");
        }
      })
      .catch((err) => {
        console.log("Timeout");
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  usernameSection() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            type="text"
            name="username"
            label="Username"
            // helperText={this.state.username_err_helperText}
            // error={this.state.username_err ? true : false}
            value={this.state.username}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="username"
          />
        </div>
      </div>
    );
  }

  displayform() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto pt-5 mt-5">
            <Card className="card m-5 p-5 mx-auto col-10 " variant="outlined">
              <form onSubmit={this.submitHandler}>
                <p className="h3 text-center mb-4">Reset Password</p>
                <div className="text-center">
                  <small>
                    {" "}
                    Please Enter your email/username to reset password
                  </small>
                </div>
                <hr className="mb-2 ml-5 mr-5"></hr>
                <div className="grey-text">
                  {/* Username Section */}
                  {this.usernameSection()}
                </div>
                <div className="text-center p-3">
                  <Button variant="contained" type="submit">
                    Reset
                  </Button>
                </div>
              </form>
              <hr />
              <CardActions className="bg-gray">
                <Button variant="contained" size="small" href="/register">
                  Register
                </Button>
                <Button variant="contained" size="small" href="/login">
                  Login
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return <div> {this.displayform()} </div>;
  }
}

export default Forgot;
