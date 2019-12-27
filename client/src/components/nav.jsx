import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {logout} from "../middleware/auth";
import {getUserName, getUserLastName} from "../middleware/user";

class Nav extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false
    };
    this.firstname = getUserName();
    this.lastname = getUserLastName();
  }

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logout(){
  logout();
  window.location.reload();
}

render() {
  return (
    <Router>
      <div>
      <div className="sidebar">
      </div>
       {/* <MDBNavbar className="navbarCustom" color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">
            Matcha
          </strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav right>
            <MDBNavItem onClick={()=>this.logout()}>
              <div className="waves-effect waves-light">
                <MDBIcon icon="sign-out-alt" className="p-2 white-text " />
                <strong className="white-text">
                  Logout
                </strong>
              </div>             
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>         */}
      </div>
     </Router>
    );
  }
}
export default Nav;