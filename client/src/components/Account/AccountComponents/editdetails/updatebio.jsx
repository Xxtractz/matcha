import React, {Component} from 'react';
import {Button, InputLabel, TextField} from "@material-ui/core";
import {getUserBio, getUserGender} from "../../../../actions/user";
import {selecFormInput, textAreaFormInput} from "../../../Form/form";

class UpdateBio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bio : '',
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

    updateBio() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-3 text-center">
                        <InputLabel>Current Value</InputLabel>
                        <TextField
                            className="col-12 text-center"
                            type="text"
                            value={getUserBio()}
                            disabled
                        />
                    </div>
                    <div className="col-6 text-center">
                        <InputLabel>Changing to</InputLabel>
                        <textarea
                            className="col-12"
                            style={{ background: "inherit" }}
                            name="bio"
                            aria-label="empty textarea"
                            onChange={this.onChange}
                            defaultValue={getUserBio()}
                            required
                            rows="10"
                            minLength="20"
                        ></textarea>
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

    render() {
        return (
            <div>
                <p className='h3 pt-3'>
                    Update Bio
                </p>
                <hr/>

                <hr/>
            </div>
        );
    }
}

export default UpdateBio;