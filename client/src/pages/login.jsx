import React, {Component } from 'react';
import { 
        MDBContainer, MDBRow, MDBCol, 
        MDBInput, MDBBtn
      } from 'mdbreact';
// import Auth from "../middleware/auth";

class Login extends Component {
  state={
    email: "",
    password: ""
  }
  onChange = (e) => {
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  login(){
    console.log(this.state);
  }

  keyPressed(){
    this.login();
  }

  render() {
    return (
      <MDBContainer  className="center-block pt-5 mt-5">
      <MDBRow>
      <MDBCol md="3">
        </MDBCol>
        <MDBCol md="6" >
          <form>
            <p className="h3 text-center mb-4">Sign in</p>
            <div className="text-center">
              <small> Please Enter you login details below</small>
            </div>
            <hr className="mb-5 ml-5 mr-5"></hr>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                value= {this.state.email}
                onChange={e => this.onChange(e)}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                value={this.state.password}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="text-center">
            <MDBBtn outline color="secondary" onClick={() => this.login()}>
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