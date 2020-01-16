import React, {Component } from 'react';
import {login} from "../actions/auth";
//import {isEmpty} from "../../utils/validate";
import {Button, TextField, Card, CardActions} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


class Login extends Component {
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


  displayVerify(){
    return(
      <Collapse in={this.state.isopen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={ () => {
                this.setState({isopen :false})
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Registration Was Successful,Verification link has been sent via Email.<strong>Verify Account before Loggin</strong> 
        </Alert>
      </Collapse>
    )
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  validInput(){
    return true;
  }

  submitHandler = e =>{
    e.preventDefault();

    const user = {
      "username": this.state.username.toString(),
      "password": this.state.password.toString(),
    };
    this.login(user);
  }
  
  login(loginUserData){
    if(this.validInput()){
      login(loginUserData).then(res => {
        if (res) {
          if(res === 204){
            console.log("Username Doesn't Exist")
          }
          else if(res === 400){
            console.log("Password is invali")
          }
          else{
            console.log(res);
            
          } 
        }else{
          console.log("Server is Offline")
        }
      }).catch(err =>{
        console.log("Timeout");
      });
    }else
    this.setState({err :"Invalid Details Entered"});
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
      <div>
        <div  className="container">
          {(window.location.hash === "#regSuccess")? this.displayVerify():""}
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
        </div>
      </div>
    )
  }
}

export default Login;