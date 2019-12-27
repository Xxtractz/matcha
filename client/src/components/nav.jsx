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

togglebutton(){
  if(this.state.isOpen){
    return "navbar-toggler collapsed";
  }else{
    return "navbar-toggler";
  }
}

toggle(){
  if(this.state.isOpen){
    return "navbar-collapse collapse show";
  }else{
    return "navbar-collapse collapse";
  }
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
          <div className=" navbarCustom navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="/">Matcha</a>
              <button className={this.togglebutton()} onClick={this.toggleCollapse} type="button" data-toggle="collapsed" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded={this.state.isOpen} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={this.toggle()}>
              < ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Link</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
export default Nav;