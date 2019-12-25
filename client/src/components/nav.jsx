import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
// import {MDBBtn} from "mdbreact";
import {logout} from "../middleware/auth";
import {getUserName, getUserLastName} from "../middleware/user";
import Sidebar from 'react-bootstrap-sidebar';

class NavbarPage extends Component {
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
                  <Button bsStyle="primary" onClick={ () => this.updateModal(true) }><Glyphicon glyph="menu-hamburger"/></Button>
                  <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
                    <Nav>
                      <NavItem href="#">Link 1</NavItem>
                      <NavItem href="#">Link 2</NavItem>
                      <NavItem href="#">Link 3</NavItem>
                      <NavItem href="#">Link 4</NavItem>
                    </Nav>
                  </Sidebar>
              </div>
     </Router>
    );
  }
}
export default NavbarPage;