import React, {Component} from 'react';
import {Button, InputLabel, TextField} from "@material-ui/core";
import {getUserFirstName, getUserId, getUserLastName, getUsername} from "../../../../actions/user";
import {refresh, update} from "../../../../actions/api";

class UpdateFullName extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newFirstName : '',
            newLastName : ''
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
        if(e.target.id === "firstname"){
            this.updateDetails({firstname : this.state.newFirstName});
        }else if(e.target.id === "lastname"){
            this.updateDetails({lastname : this.state.newLastName});
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

    updateFirstName(){
        return (
            <form id='firstname' onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="text"
                            value={getUserFirstName()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        <InputLabel>Changing to</InputLabel>
                        <TextField
                            className="col-12"
                            type="text"
                            name="newFirstName"
                            value={this.state.newFirstName}
                            onChange={(e) => this.onChange(e)}
                            required
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

    updateLastName(){
        return (
            <form id='lastname' onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="text"
                            name="lname"
                            value={getUserLastName()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        <InputLabel>Changing to</InputLabel>
                        <TextField
                            className="col-12"
                            type="text"
                            name="newLastName"
                            value={this.state.newLastName}
                            onChange={(e) => this.onChange(e)}
                            required
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
                    Update fullname
                </p>
                <hr/>

                {this.updateFirstName()}
                {this.updateLastName()}
                <hr/>
            </div>
        );
    }
}

export default UpdateFullName;