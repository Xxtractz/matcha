import React, {Component } from 'react';
import {login} from "../../middleware/auth";
import {isEmpty} from "../../utils/validate";
import {Button, TextField, Card, CardActions} from '@material-ui/core';


class Login extends Component {
  constructor(){
    super();
    this.state={
      email: "",
      password: "",
      email_err:"",
      email_err_helperText:"",
      password_err:"",
      password_err_helperText:"",
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  validInput(){
    if(!isEmpty(this.state.email.toString()) && !isEmpty(this.state.password.toString())){
      if(this.state.email.toString().match("musambaloyi@gmail.com")){
        return true;
      }
      this.setState({email_err: "error"});
      this.setState({email_err_helperText: "Email error"});
    }
    this.setState({err :"Email invalid Input"});
    return false;
  }

  submitHandler = e =>{
    e.preventDefault();
    this.login();
  }
  
  login(){
    if(this.validInput()){
      login(this.state);
      window.location.reload();
    }else
    this.setState({err :"Invalid Details Entered"});
  }

  render() {
    return (
      <div>
        <div  className="container">
          <div className="row">
            <div className="col-6 mx-auto pt-5 mt-5" >
              <Card className="card m-5 p-5 mx-auto col-10">
                <form onSubmit={this.submitHandler}>
                  <p className="h3 text-center mb-4">Sign in</p>
                  <div className="text-center">
                    <small> Please Enter you login details below</small>
                  </div>
                  <hr className="mb-2 ml-5 mr-5"></hr>
                  <div className="grey-text">
                    <div className="row">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          type="email" 
                          name="email"
                          label="Email"
                          helperText={this.state.email_err_helperText}
                          error={this.state.email_err ? true : false}
                          value= {this.state.email}
                          onChange={e => this.onChange(e)}
                          required
                        />
                    </div>
                  </div> 
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
                        />
                      </div>
                    </div>
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