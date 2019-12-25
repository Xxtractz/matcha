import React, {Component } from 'react';
import { 
        MDBContainer, MDBRow, MDBCol, 
        MDBInput, MDBBtn
      } from 'mdbreact';
import {login} from "../../middleware/auth";
import {isEmpty} from "../../utils/validate"

class Login extends Component {
  constructor(){
    super();
    this.state={
      email: "",
      password: "",
      err:[]
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
      this.setState({err :"Email invalid"});
    }
    this.setState({err :"Email invalid Input"});
    return false;
  }

  submitHandler = event => {
    event.preventDefault();
    this.login();
  };
  
  login(){
    if(this.validInput()){
      login(this.state);
      window.location.reload();
    }else
    this.setState({err :"Invalid Details Entered"});
  }

  render() {
    return (
      <MDBContainer  className="center-block pt-5 mt-5">
      <MDBRow>
      <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6" >
          <form
            onSubmit={this.submitHandler}
          >
            <p className="h3 text-center mb-4">Sign in</p>
            <div className="text-center">
              <small> Please Enter you login details below</small>
            </div>
            <hr className="mb-5 ml-5 mr-5"></hr>
            <div className="text-center">
              {this.state.err}
            </div>
            {/* <ul className="text-center" >
              {this.state.err.map(item => (
                <li>{item.value}</li>
              ))}
              </ul> */}
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                type="email"
                group
                name="email"
                value= {this.state.email}
                onChange={e => this.onChange(e)}
                required
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                name="password"
                type="password"
                value={this.state.password}
                onChange={e => this.onChange(e)}
                required
              />
            </div>
            <div className="text-center">
            <MDBBtn outline color="success" type="submit">
            {/* <MDBBtn outline color="success" type="submit" onClick={()=>this.login()}> */}
                Send
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3">
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    )
  }
}

export default Login;