import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {MDBBtn} from "mdbreact";
import {logout} from "../middleware/auth"

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
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="">Home</Nav.Link>
          <Nav.Link href="">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
          <MDBBtn outline color="red" onClick={()=>this.logout()}>Logout</MDBBtn>
      </Navbar.Collapse>
    </Navbar>
     </Router>
    );
  }
}
export default NavbarPage;