import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {MDBBtn} from "mdbreact";
import {logout} from "../middleware/auth"
import {userName} from "../middleware/auth"

class NavbarPage extends Component {
state = {
  isOpen: false
};

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
      <Navbar bg="blue" expand="sm"  fixed="top">
      <Navbar.Brand href="/">Matcha</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {userName()}
          <MDBBtn outline color="red" onClick={()=>this.logout()}>Logout</MDBBtn>
    </Navbar>
     </Router>
    );
  }
}
export default NavbarPage;