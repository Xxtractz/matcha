import React, {Component} from 'react';
import {Button, InputLabel, TextField} from "@material-ui/core";
import {getUserFirstName, getUserLastName} from "../../../../actions/user";

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
        console.log(this.state);
    }

    submitHandler = (e) => {
        e.preventDefault();
        // console.log(e);
    }

    updateFirstName(){
        return (
            <form id='#firstname' onSubmit={this.submitHandler}>
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
                        <Button className='m-2' variant="outlined" color="primary">
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        );
    }

    updateLastName(){
        return (
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
                        name="fname"
                        // helperText={this.state.fname_err_helperText}
                        // error={!!this.state.fname_err}
                        // value={this.state.fname}
                        // onChange={(e) => this.onChange(e)}
                        required
                    />
                </div>
                <div className="col-3 text-center">
                    <Button className='m-2' variant="outlined" color="primary" href='/user'>
                        Update
                    </Button>
                </div>
            </div>
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