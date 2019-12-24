class Auth{
  constructor(){
    this.loggedin = false;
  }
  
  login(userdata){
    this.loggedin = true;
  }
}
export default Auth;