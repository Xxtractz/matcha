import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
// import {MDBBtn} from "mdbreact";
import {logout} from "../middleware/auth";
import {getUserName, getUserLastName} from "../middleware/user";

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
                     nav
              </div>
     </Router>
    );
  }
}
export default NavbarPage;