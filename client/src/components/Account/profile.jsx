import React, { Component } from 'react';
import {Paper} from "@material-ui/core";
import {Button, TextField, Card, CardActions} from '@material-ui/core';


class UserProfile extends Component {

  constructor(){
    super();
    this.state={
      username: "",
      username_err:"",
      username_err_helperText:"",
      password: "",
      password_err:"",
      password_err_helperText:"",
      isopen:true
    }
  }


  submitHandler = e =>{
    e.preventDefault();

    const user = {
      "username": this.state.username.toString(),
      "password": this.state.password.toString(),
    };
    this.login(user);
  }
  

  onChange = (e) => {
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  
  // Form Sections
  usernameSection(){
    return( 
    <div className="row">
      <div className="col-12 text-center">
        <TextField 
          className="col-12"
          type="text" 
          name="username"
          label="Username"
          helperText={this.state.username_err_helperText}
          error={this.state.username_err ? true : false}
          value= {this.state.username}
          onChange={e => this.onChange(e)}
          required
          autoComplete="username"
        />
      </div>
    </div>
   )
  }

  passwordSection(){
    return(
      <div className="row">
        <div className="col-12 text-center">
          <TextField 
            className="col-12"
            name="password"
            type="password"
            label="Password"
            helperText={this.state.password_err_helperText}
            error={this.state.password_err ? true : false}
            value={this.state.password}
            onChange={e => this.onChange(e)}
            required
            autoComplete="current-password"
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <Paper className="container p-2 mt-4 col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center bg_gradient" variant="elevation">
            <h1>Profile</h1>
            <small> Details about you </small>
          </Paper>
          <div className="row">
            <div className="col-md-6 mx-auto pt-5 mt-5" >
              <Card className="card m-5 p-5 mx-auto col-10 " variant="outlined">
                <form onSubmit={this.submitHandler}>
                  <p className="h3 text-center mb-4">Sign in</p>
                  <div className="text-center">
                    <small> Please Enter you login details below</small>
                  </div>
                  <hr className="mb-2 ml-5 mr-5"></hr>
                  <div className="grey-text">

                    {/* Username Section */}
                    {this.usernameSection()}

                    {/* Password Section */}
                    {this.passwordSection()}

                  </div>
                  <div className="text-center p-3">
                    <Button variant="contained" type="submit" >
                      Login
                    </Button>
                  </div>
                </form>
                <hr/>
                <CardActions className="bg-gray">
                  <Button variant="contained" size="small"  href="/register">
                    Register
                  </Button>
                </CardActions>
              </Card>
            </div>
            </div>
      </Paper>
    );
  }
}

export default UserProfile;
