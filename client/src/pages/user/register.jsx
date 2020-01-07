import React, { Component } from "react";
import axios from 'axios';
import {Button, TextField, Card, CardActions, ButtonBase} from '@material-ui/core';

class Register extends Component {

  constructor(){
    super();
    this.state={
      fname:"",
      lname:"",
      username:"",
      age:"",
      email: "",
      password: "",
      email_err:"",
      email_err_helperText:"",
      password_err:"",
      password_err_helperText:"",
    }
  }

  
  submitHandler = e =>{
    e.preventDefault();
    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      username: this.state.username,
      age: this.state.age,
      email: this.state.email,
      password: this.state.password,
    };

    axios.post(`http://localhost:3000/api/register`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  // register(){
  //   axios.post('http://localhost:3000/api/register', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  getLimitMax(){
    var date = new Date();
    date.setFullYear( date.getFullYear() - 18 );
    return  (date.getFullYear())+"-"+(date.getMonth())+"-"+(date.getDate());
  }

  getLimitMin(){
    var date = new Date();
    date.setFullYear( date.getFullYear() - 80 );
    return  (date.getFullYear())+"-"+(date.getMonth())+"-"+(date.getDate());
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  render(){
    return (
      <div>
        <div  className="container">
          <div className="row">
            <div className="col-7 mx-auto pt-5 mt-5" >
              <Card className="card m-5 p-5 mx-auto col-10">
                {/* <form onSubmit={this.submitHandler}> */}
                <form onSubmit={this.submitHandler}>
                  <p className="h3 text-center mb-4">Register</p>
                  <div className="text-center">
                    <small> Please Enter your Registration details below</small>
                  </div>
                  <hr className="mb-2 ml-5 mr-5"></hr>
                  <div className="grey-text">
                    <div className="row mb-3">
                      <div className="col-6 text-center">
                        <TextField 
                          className="col-12"
                          type="text" 
                          name="fname"
                          label="First Name"
                          // helperText={this.state.email_err_helperText}
                          // error={this.state.email_err ? true : false}
                          value= {this.state.name}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                      <div className="col-6 text-center">
                        <TextField 
                          className="col-12"
                          type="text" 
                          name="lname"
                          label="Last Name"
                          // helperText={this.state.email_err_helperText}
                          // error={this.state.email_err ? true : false}
                          // value= {this.state.email}
                          // onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div> 
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField
                          id="date"
                          label="Birthday"
                          type="date"
                          className="col-8"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            max: this.getLimitMax(),
                            min: this.getLimitMin()
                          }}
                          required
                        />
                      </div>
                    </div> 
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          type="email" 
                          name="email"
                          label="Email"
                          // helperText={this.state.email_err_helperText}
                          // error={this.state.email_err ? true : false}
                          // value= {this.state.email}
                          // onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div> 
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          name="password"
                          type="password"
                          label="Password"
                          // helperText={this.state.password_err_helperText}
                          // error={this.state.password_err ? true : false}
                          // value={this.state.password}
                          // onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          name="password"
                          type="password"
                          label="Confirm Password"
                          // helperText={this.state.password_err_helperText}
                          // error={this.state.password_err ? true : false}
                          // value={this.state.password}
                          // onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-3 mt-4">
                    <Button variant="contained" type="submit" >
                      Register
                    </Button>
                  </div>
                </form>
                <hr/>
                <CardActions className="bg-gray">
                  <ButtonBase variant="text" size="small"  href="/login">
                    Already a have an account?
                  </ButtonBase>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;