import React, {Component} from 'react';
import {Button, Paper, TextField, InputLabel} from "@material-ui/core";
import {getUserFirstName, getUserLastName} from "../../../../actions/user";

class Update extends Component {

    updateFirstName(){
        return (
            <div className="row m-5">
                <div className="col-3 text-center">
                    <InputLabel>Current Value</InputLabel>
                    <TextField
                        className="col-12"
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
                        className="col-12"
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

    updateProfile(){
        return (
            <div>
                {this.updateFirstName()}
                {this.updateLastName()}
            </div>
        );
    }

    updateImages(){
        return (
            <div>
               Images
            </div>
        );
    }

    render() {
        return (
            <div className="container p-2  bg-transparent col-12">
                <Paper className="container p-2 mt-4 col-12" variant="outlined">
                <Paper className="col-12 mt-2 p-1 text-center" variant="outlined">
                    <h1>Details Update</h1>
                    <small> Please update your details below.</small>
                </Paper>
                    <div className="p-3">
                        <Button variant="outlined" color="primary" href='/user'>
                            {'<-'} Back
                        </Button>
                    </div>
                    <div className="p-3">
                        {window.location.hash === '#updateProfile'? this.updateProfile():''}
                        {window.location.hash === '#updateImages'? this.updateImages():''}
                    </div>

                </Paper>
            </div>
        );
    }
}

export default Update;