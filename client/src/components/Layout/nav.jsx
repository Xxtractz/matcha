import React, { Component } from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import {logout} from "../../middleware/auth";
import {getUserName, getUserLastName} from "../../middleware/user";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Button, Card, CardMedia, CardContent, Typography, List, ListItem, ListItemText } from "@material-ui/core";


class Nav extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false,
    };
    this.firstname = getUserName();
    this.lastname = getUserLastName();
  }

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

togglebutton(){
  if(this.state.isOpen){
    return "navbar-toggler float-right collapsed";
  }else{
    return "navbar-toggler float-right";
  }
}

toggle(){
  if(this.state.isOpen){
    return "navbar-collapse collapse show";
  }else{
    return "navbar-collapse collapse ";
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
          {/* Start Of Side Bar */}
          <div className="sidebar">
            <div className="col-12 mt-5">
              <Card className="mt-5 text-center" style={{background:"#b54e80d1"}}>
                <CardMedia className="">
                  <img className="img-fluid" src="src/assets/images/profile.png" alt="profile"/>
                </CardMedia>
                <CardContent>
                  <Typography>
                    {this.firstname} {this.lastname} 
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <hr/>
            <div className="col-12">
              <List component="nav" >
                <a className="text-decoration-none text-dark" href="/"> 
                  <ListItem button className="text-center">
                    <ListItemText>
                      Home
                    </ListItemText>
                  </ListItem>
                </a>
                <a className="text-decoration-none text-dark" href="/user"> 
                  <ListItem button className="text-center">
                    <ListItemText>
                      Account
                    </ListItemText>
                  </ListItem>
                </a>
              </List>
            </div>
          </div>
          {/* End of SideBar 
          *Nav Starts here
          */}
          <div className="navbarCustom navbar navbar-expand-lg navbar-dark" style={{background: "#004085"}}>
              <a className="navbar-brand " href="/">Matcha</a>
              <button className={this.togglebutton()} onClick={this.toggleCollapse} type="button" data-toggle="collapsed" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded={this.state.isOpen} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={this.toggle()}>
              < ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Button className="pr-2 nav-link" onClick={() => this.logout()}>
                      <PowerSettingsNewIcon className="" /> 
                       <span className="p-1">Logout</span> 
                    </Button>
                  </li>
                </ul>
            </div>
          </div>
          {/* Nav ends Here */}
        </div>
      </Router>
    )
  }
}
export default Nav;

