import React, {Component} from 'react';
import {selecFormInput} from "../../../Form/form";
import {Button, InputLabel, TextField} from "@material-ui/core";
import {
    getUserGender,
    getUserGenderPreference,
    getUserId,
    getUsername
} from "../../../../actions/user";
import {refresh, update} from "../../../../actions/api";

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
        if(e.target.id === "gender"){
            if (this.state.gender !== ""){
                this.updateDetails({gender: this.state.gender});
            }
        }else if(e.target.id === "genderPreference"){
            if (this.state.genderPreference !== ""){
                this.updateDetails({genderPreference: this.state.genderPreference});
            }
        }
    }

    updateDetails(user){
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


    updateGender() {
        return (
            <form id="gender" onSubmit={this.submitHandler}>
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
                            ["","Male", "Female", "Both",])}
                    </div>
                    <div className="col-3 text-center">
                        <Button className='m-2' variant="outlined" color="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </div>
        </form>
        )
    }

    updateGenderPreference(){
        return(
            <form id="genderPreference" onSubmit={this.submitHandler}>
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
                            ["","Male", "Female", "Both"]
                        )}
                    </div>
                    <div className="col-3 text-center">
                        <Button className='m-2' variant="outlined" color="primary" type="submit">
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