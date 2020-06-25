import React, {Component} from 'react';
import {selecFormInput} from "../../../Form/form";
import {Button, InputLabel, TextField} from "@material-ui/core";
import {getUserFirstName, getUserGender, getUserGenderPreference} from "../../../../actions/user";

class UpdateGender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: "",
            genderPreference: ""
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
    };

    updateGender() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="text"
                            value={getUserGender()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        {selecFormInput(
                            "col-12",
                            "Changing to",
                            "gender",
                            (e) => this.onChange(e),
                            ["", "Male", "Female", "Both",])}
                    </div>
                    <div className="col-3 text-center">
                        <Button className='m-2' variant="outlined" color="primary">
                            Update
                        </Button>
                    </div>
                </div>
        </form>
        )
    }

    updateGenderPreference(){
        return(
            <form onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="text"
                            value={getUserGenderPreference()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        {selecFormInput(
                            "col-12",
                            "Changing to",
                            "genderPreference",
                            (e) => this.onChange(e),
                            ["", "Male", "Female", "Both"]
                        )}
                    </div>
                    <div className="col-3 text-center">
                        <Button className='m-2' variant="outlined" color="primary">
                            Update
                        </Button>
                    </div>
                </div>

            </form>
        )
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value],
        });
    };

    render() {
        return (
            <div>
                <p className='h3 pt-3'>
                    Update gender
                </p>
                <hr/>
                {this.updateGender()}
                {this.updateGenderPreference()}
                <hr/>
            </div>
        );
    }
}
export default UpdateGender;