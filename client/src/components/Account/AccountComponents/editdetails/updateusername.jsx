import React, {Component} from 'react';
import {refresh, update} from "../../../../actions/api";
import {getUserId, getUserLastName, getUsername} from "../../../../actions/user";
import {Button, InputLabel, TextField} from "@material-ui/core";

class UpdateUsername extends Component {

    constructor(props) {
        super(props);

        this.state ={
            username: "",
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
        if(e.target.id === "username" ){
            if ((getUsername() === this.state.username))
                return;
            this.updateDetails({username : this.state.username});
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

    updateusername(){
        return (
            <form id='username' onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="text"
                            name="username"
                            value={getUsername()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        <InputLabel>Changing to</InputLabel>
                        <TextField
                            className="col-12"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={(e) => this.onChange(e)}
                            required
                            autoComplete="username"
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
                    Update Username
                </p>
                <hr/>
                {this.updateusername()}
                <hr/>
            </div>
        );
    }
}

export default UpdateUsername;