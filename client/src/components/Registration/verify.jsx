import React, { Component } from "react";
import { Button, TextField, Card, CardActions } from "@material-ui/core";
import { verify } from "../../actions/api";
import { reverifyUser } from "../../actions/api";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

class verifyUser extends Component {
  constructor() {
    super();
    this.state = {
      isopen: true,
      invalidToken: false,
      displayform: false,
      email: "",
      error: "",
    };
  }

  verifyToken = (token) => {
    verify(token).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        window.location.replace("/login");
      }
      if (res.status === 400) {
        this.setState({ displayform: true });
        this.setState({ invalidToken: true });
        console.log(this.state);
      }
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email.toString(),
    };
    this.handleVerify(user);
  };

  handleVerify(email) {
    reverifyUser(email)
      .then((res) => {
        if (res) {
          if (res.status === 200) {
            window.location.replace("/login");
          }
          else if (res.status === 404) {
            this.setState({ error: "Username does not exist" });
          }
          else if (res.status === 409) {
            this.setState({ error: "Account has been Verified" });
          }
          else {
            this.setState({ error: "Sorry, System is unavailable, please try again later" });
          }
        } else {
          this.setState({ error: "Sorry, System is unavailable, please try again later" });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: "Sorry, System is unavailable, please try again later" });
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
    if (this.state.error) {
      this.setState({ error: "" });
    }
  };

  emailSection() {
    return (
      <div className="row mb-3">
        <div className="col-12 text-center">
          <TextField
            className="col-12"
            type="email"
            name="email"
            label="Email"
            value={this.state.email}
            onChange={(e) => this.onChange(e)}
            required
            autoComplete="email"
          />
        </div>
      </div>
    );
  }

  displayVerifyError() {
    return (
      <Collapse in={this.state.isopen}>
        <Alert
          variant="outlined"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                this.setState({ isopen: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <strong>
            The current Token is invalid, Request for a new verification Token
            Below
          </strong>
        </Alert>
      </Collapse>
    );
  }

  displayErr() {
    if (this.state.error) {
      if (this.state.error.toString() === "") {
        return <div />;
      } else {
        return (
            <div className="m-2 ml-5 mr-5">
              <Alert variant="outlined" severity="error">
                {this.state.error.toString()}
              </Alert>
            </div>
        );
      }
    }
    return <div />;
  }

  displayform() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto pt-5 mt-5">
          {this.displayErr()}
          <Card className="card m-5 p-5 mx-auto col-10 " variant="outlined">
            <form onSubmit={this.submitHandler}>
              <p className="h3 text-center mb-4">Verify Account</p>
              <div className="text-center">
                <small>
                  {" "}
                  Please Enter your email address to verify Account
                </small>
              </div>
              <hr className="mb-2 ml-5 mr-5"></hr>
              <div className="grey-text">
                {/* Username Section */}
                {this.emailSection()}
              </div>
              <div className="text-center p-3">
                <Button variant="outlined"
                        color="primary"
                        size="small" type="submit">
                  Verify
                </Button>
              </div>
            </form>
            <hr />
            <CardActions className="bg-gray">
              <Button variant="outlined"
                      color="primary"
                      size="small"
                      href="/register">
                Register
              </Button>
              <Button variant="outlined"
                      color="primary"
                      size="small" href="/login">
                Login
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }

  render() {
    const tokenlink = window.location.search
      ? window.location.search.split("=")[1].toString()
      : "";
    return (
      <div className="container">
        {this.state.invalidToken === true ? this.displayVerifyError() : ""}
        {window.location.search && this.state.displayform === false
          ? this.verifyToken(tokenlink)
          : this.displayform()}
      </div>
    );
  }
}

export default verifyUser;
