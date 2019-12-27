import React, {Component } from 'react';
import {login} from "../../middleware/auth";
import {isEmpty} from "../../utils/validate"

class Login extends Component {
  constructor(){
    super();
    this.state={
      email: "",
      password: "",
      err:[]
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name] : [e.target.value]
    })
  }

  validInput(){
    if(!isEmpty(this.state.email.toString()) && !isEmpty(this.state.password.toString())){
      if(this.state.email.toString().match("musambaloyi@gmail.com")){
        return true;
      }
      this.setState({err :"Email invalid"});
    }
    this.setState({err :"Email invalid Input"});
    return false;
  }

  submitHandler = event => {
    event.preventDefault();
    this.login();
  };
  
  login(){
    if(this.validInput()){
      login(this.state);
      window.location.reload();
    }else
    this.setState({err :"Invalid Details Entered"});
  }

  render() {
    return (
      <div>
         <div  className="container center-block pt-5 mt-5">
          <div className="row">
            <div className="md-col-3">
              <div className="col">
                <div className="md-col-6" >
                  <form onSubmit={this.submitHandler}>
                    <p className="h3 text-center mb-4">Sign in</p>
                    <div className="text-center">
                      <small> Please Enter you login details below</small>
                    </div>
                    <hr className="mb-5 ml-5 mr-5"></hr>
                    <div className="text-center">
                      {this.state.err}
                    </div>
                    <div className="grey-text">
                      <input className="input" icon="envelope" type="email" name="email"
                        value= {this.state.email}
                        onChange={e => this.onChange(e)}
                        required
                        validate
                        error="wrong"
                        success="right"
                        />
                      <input
                        label="Type your password"
                        icon="lock"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.onChange(e)}
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button className="btn" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;