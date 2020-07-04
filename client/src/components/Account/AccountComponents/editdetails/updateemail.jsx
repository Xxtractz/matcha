import React, {Component} from 'react';
import {getUserEmail, getUserId, getUsername} from "../../../../actions/user";
import {refresh, update} from "../../../../actions/api";
import {Button, InputLabel, TextField} from "@material-ui/core";

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state ={
            email: "",
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value],
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        if(e.target.id === "email" ){
            if ((getUserEmail() === this.state.email))
                return;
            this.updateDetails({email : this.state.email});
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

    updateemail(){
        return (
            <form id='email' onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="email"
                            name="email"
                            value={getUserEmail()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        <InputLabel>Changing to</InputLabel>
                        <TextField
                            className="col-12"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.onChange(e)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="col-3 text-center">
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
                    Update Email
                </p>
                <hr/>
                {this.updateemail()}
                <hr/>
            </div>
        );
    }
}


export default UpdateEmail;