import React, {Component} from 'react';
import {Button, InputLabel, TextField} from "@material-ui/core";
import {getUserBio, getUserGender, getUserId, getUsername} from "../../../../actions/user";
import {selecFormInput, textAreaFormInput} from "../../../Form/form";
import {refresh, update} from "../../../../actions/api";

class UpdateBio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bio : getUserBio(),
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
        if(e.target.id === "bio"){
            this.updateDetails({bio : this.state.bio});
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

    updateBio() {
        return (
            <form id='bio' onSubmit={this.submitHandler}>
                <div className="row m-5">
                    <div className="col-8 text-center">
                        <InputLabel>Update</InputLabel>
                        <textarea
                            className="col-12"
                            style={{ background: "inherit" }}
                            name="bio"
                            aria-label="empty textarea"
                            onChange={this.onChange}
                            value={this.state.bio}
                            required
                            rows="10"
                            minLength="20"
                        ></textarea>
                    </div>
                    <div className="col-3 text-center">
                        <Button className='m-5' variant="outlined" color="primary" type="submit">
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
                {this.updateBio()}
                <hr/>
            </div>
        );
    }
}

export default UpdateBio;