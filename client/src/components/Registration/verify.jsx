import React, { Component } from 'react';
import {Button, TextField, Card, CardActions} from '@material-ui/core';
import {verify} from '../../actions/auth';
import {Reverify} from '../../actions/auth';

class verifyUser extends Component {

    constructor(){
        super();
        this.state={
            displayform: false,
            email:""
        }
      }

    verifyToken = (token) =>{
        verify(token).then(res => {
            // console.log(res);
            if(res.status === 200){
                window.location.replace('/login');
            }
            if(res.status === 400){
                this.setState({displayform : true});
            }
        });
    }

    submitHandler = e =>{
        e.preventDefault();
    
        const user = {
          "email": this.state.email.toString()
        };
        this.handleVerify(user);
      }


      handleVerify(email){
          Reverify(email).then(res => {
            if (res) {
              if(res === 204){
                console.log("Username Doesn't Exist")
              }
              if(res === 200){
                window.location.replace("/login");
              }
              else{
                console.log(res);
                
              } 
            }else{
              console.log("Server is Offline")
            }
          }).catch(err =>{
            console.log("Timeout");
          });
      }

      onChange = (e) => {
        this.setState({
          [e.target.name] : [e.target.value]
        })
      }

      emailSection(){
        return(
          <div className="row mb-3">
            <div className="col-12 text-center">
              <TextField 
                className="col-12"
                type="email" 
                name="email"
                label="Email"
                // helperText={this.state.email_err_helperText}
                // error={this.state.email_err ? true : false}
                value= {this.state.email}
                onChange={e => this.onChange(e)}
                required
                autoComplete="email"
              />
            </div>
          </div> 
        )
      }

    displayform(){
        return (
            <div  className="container">
            <div className="row">
              <div className="col-md-6 mx-auto pt-5 mt-5" >
                <Card className="card m-5 p-5 mx-auto col-10 " variant="outlined">
                  <form onSubmit={this.submitHandler}>
                    <p className="h3 text-center mb-4">Verify Account</p>
                    <div className="text-center">
                      <small> Please Enter your email address to verify Account</small>
                    </div>
                    <hr className="mb-2 ml-5 mr-5"></hr>
                    <div className="grey-text">
  
                      {/* Username Section */}
                      {this.emailSection()}
  
                    </div>
                    <div className="text-center p-3">
                      <Button variant="contained" type="submit" >
                        Verify
                      </Button>
                    </div>
                  </form>
                  <hr/>
                  <CardActions className="bg-gray">
                    <Button variant="contained" size="small"  href="/register">
                      Register
                    </Button>
                    <Button variant="contained" size="small"  href="/login">
                      Login
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        )
    }
    
    render() {
        const tokenlink = window.location.search? window.location.search.split("=")[1].toString() : "";
        return (
            <div>
                {
                window.location.search && this.state.displayform === false ?
                    this.verifyToken(tokenlink) : this.displayform()}
            </div>
        );
    }
}

export default verifyUser;
