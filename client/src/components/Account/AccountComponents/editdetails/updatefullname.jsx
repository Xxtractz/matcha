import React, {Component} from 'react';
import {Button, InputLabel, TextField} from "@material-ui/core";
import {getUserFirstName, getUserLastName} from "../../../../actions/user";

class UpdateFullName extends Component {
    updateFirstName(){
        return (
            <div className="row m-5">
                <div className="col-3 text-center">
                    <InputLabel>Current Value</InputLabel>
                    <TextField
                        className="col-12 text-center"
                        type="text"
                        name="fname"
                        value={getUserFirstName()}
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
                {this.updateFirstName()}
                {this.updateLastName()}
            </div>
        );
    }
}

export default UpdateFullName;