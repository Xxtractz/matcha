import React, { Component } from "react";
import {register} from '../../middleware/auth';
import {Button, TextField, Card, CardActions, ButtonBase} from '@material-ui/core';
import {isYearValid} from '../../utils/validate';

class Register extends Component {

  constructor(){
    super();
    this.state={
      fname:"",
      lname:"",
      username:"",
      username_err:"",
      username_err_helperText:"",
      year:"",
      year_err:"",
      year_err_helperText:"",
      month:"",
      month_err:"",
      month_err_helperText:"",
      day:"",
      day_err:"",
      day_err_helperText:"",
      email: "",
      email_err:"",
      email_err_helperText:"",
      password: "",
      password_err:"",
      password_err_helperText:""
    }
  }

  
  submitHandler = e =>{
    e.preventDefault();

    if(this.isvalidated()){
      const user = {
        "fname": this.state.fname.toString(),
        "lname": this.state.lname.toString(),
        "username": "Musa",
        "age": '18',
        "email": this.state.email.toString(),
        "password": this.state.password.toString(),
      };
      this.register(user);
    }
  }

  isvalidated(){
    if(isYearValid(this.state.year)){
      return true;
    }
    else{ 
      return false;
    }
  }
  register(userData){
      if(register(userData)){
        window.alert("Registration Succesful");
        window.location.replace("/login");
      }
  }

  onChange = (e) => {
    if(e.target.name === "year"){
        if(!isYearValid(e.target.value)){
          this.setState({year_err: "error"});
          this.setState({year_err_helperText: "Year error"});
        }
        else{
          this.setState({year_err: ""});
          this.setState({year_err_helperText: ""});
        }
    }
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  render(){
    return (
      <div>
        <div  className="container">
          <div className="row">
            <div className="col-md-8 mx-auto pt-5 mt-5" >
              <Card className="card m-5 p-5 mx-auto col-10">

                {/* Form Starts */}
                <form onSubmit={this.submitHandler}>

                  {/* Header Text Start */}
                  <p className="h3 text-center mb-4">Register</p>
                  <div className="text-center">
                    <small> Please Enter your Registration details below</small>
                  </div>
                  {/* Header Text End */}

                  <hr className="mb-2 ml-5 mr-5"></hr>

                  {/* Input Box Start */}
                  <div className="grey-text">

                    {/* Fname and  lastName Row */}
                    <div className="row mb-3">
                      <div className="col-6 text-center">
                        <TextField 
                          className="col-12"
                          type="text" 
                          name="fname"
                          label="First Name"
                          helperText={this.state.fname_err_helperText}
                          error={this.state.fname_err ? true : false}
                          value= {this.state.fname}
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
                          value= {this.state.lname}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div> 

                    {/* Age / Date of Birth  */}
                    <div className="row mb-3">
                      <div className="col text-center">
                        <TextField
                          id="date_yy"
                          label="YYYY"
                          name="year"
                          type="text"
                          className="col-8"
                          helperText={this.state.year_err_helperText}
                          error={this.state.year_err ? true : false}
                          value= {this.state.year}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                      <div className="col text-center">
                        <TextField
                          id="date_month"
                          label="MM"
                          name="month"
                          type="text"
                          className="col-8"
                          value= {this.state.month}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                      <div className="col text-center">
                        <TextField
                          id="date_day"
                          label="DD"
                          name="day"
                          type="text"
                          className="col-8"
                          value= {this.state.day}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div>

                    {/* Username */}
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          type="text" 
                          name="username"
                          label="Username"
                          // helperText={this.state.email_err_helperText}
                          // error={this.state.email_err ? true : false}
                          value= {this.state.username}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div> 

                    {/* Email */}
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          type="email" 
                          name="email"
                          label="Email"
                          // helperText={this.state.email_err_helperText}
                          // error={this.state.email_err ? true : false}
                          value= {this.state.email}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div> 

                    {/* Password */}
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <TextField 
                          className="col-12"
                          name="password"
                          type="password"
                          label="Password"
                          // helperText={this.state.password_err_helperText}
                          // error={this.state.password_err ? true : false}
                          value={this.state.password}
                          onChange={e => this.onChange(e)}
                          required
                        />
                      </div>
                    </div>

                    {/* Confirm Password  */}
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
                  {/* Input Box End */}

                  {/* Button */}
                  <div className="text-center p-3 mt-4">
                    <Button variant="contained" type="submit" >
                      Register
                    </Button>
                  </div>

                </form>
                {/* Form Ends */}

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