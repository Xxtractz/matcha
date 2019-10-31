import React, { Component } from 'react'
import { 
        MDBContainer, MDBRow, MDBCol, 
        MDBInput, MDBBtn, MDBIcon 
      } from 'mdbreact';

class login extends Component {
  render() {
    return (
      <MDBContainer mx-auto>
      <MDBRow>
        <MDBCol md="6" >
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
            <MDBBtn outline color="secondary">
                Send <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    )
  }
}

export default login;