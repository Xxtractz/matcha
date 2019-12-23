import React from "react";
import { Redirect } from "react-router-dom";

class Auth{
  constructor(){
    this.loggedin = false;
  }
  
  login(){
    this.loggedin = true;
  }
}
export default Auth;