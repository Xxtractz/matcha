import React, {Component} from 'react';
import {getUserId, getUsername} from "../../../../actions/user";
import {refresh, update} from "../../../../actions/api";
import {Button, TextField} from "@material-ui/core";
import {isEqual,isPassword} from "../../../../utils/validate";

class UpdatePassword extends Component {
    constructor(props) {
        super(props);

        this.state ={
            password: "",
            password_err: "",
            password_err_helperText: "",
            confirmPassword: "",
            confirmPassword_err: "",
            confirmPassword_err_helperText: "",
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value],
        });
        this.validateAfterInput(e);
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        if(e.target.id === "password" ){
            this.updateDetails({password : this.state.password, username: getUsername()});
        }
    }

    updateDetails = (user) =>{
        update(getUserId(), user)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    refresh(getUsername()).then();
                    window.location.pathname = "/";
                    window.location.hash ="";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    validateAfterInput(e) {
        if (e.target.name === "password") {
            if (!isPassword(e.target.value)) {
                this.setState({ password_err: "error" });
                this.setState({ password_err_helperText: "Passwords Isn't Secured" });
            } else {
                this.setState({ password_err: "" });
                this.setState({ password_err_helperText: "" });
            }
        }
        if (e.target.name === "confirmPassword") {
            if (!isEqual(e.target.value, this.state.password.toString())) {
                this.setState({ confirmPassword_err: "error" });
                this.setState({
                    confirmPassword_err_helperText: "Passwords Don't Match",
                });
            } else {
                this.setState({ confirmPassword_err: "" });
                this.setState({ confirmPassword_err_helperText: "" });
            }
        }
        this.setState({ error: "" });
    }

    passwordSection() {
        return (
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <TextField
                        className="col-12"
                        name="password"
                        type="password"
                        label="New Password"
                        helperText={this.state.password_err_helperText}
                        error={!!this.state.password_err}
                        value={this.state.password}
                        onChange={(e) => this.onChange(e)}
                        required
                        autoComplete="new-password"
                    />
                </div>
            </div>
        );
    }

    confirmPasswordSection() {
        return (
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <TextField
                        className="col-12"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        helperText={this.state.confirmPassword_err_helperText}
                        error={!!this.state.confirmPassword_err}
                        value={this.state.confirmPassword}
                        onChange={(e) => this.onChange(e)}
                        required
                        autoComplete="new-password"
                    />
                </div>
            </div>
        );
    }

    updatepassword(){
        return (
            <form id='password' onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-4 text-center">
                        {this.passwordSection()}
                    </div>
                    <div className="col-4 text-center">
                        {this.confirmPasswordSection()}
                    </div>
                    <div className="col-4 text-center">
                        <Button className='m-2' variant="outlined" color="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div>
                <p className='h3'>
                    Update Password
                </p>
                <hr/>
                {this.updatepassword()}
                <hr/>
            </div>
        );
    }
}
export default UpdatePassword;