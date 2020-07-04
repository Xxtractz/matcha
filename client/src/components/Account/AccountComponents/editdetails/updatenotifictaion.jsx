import React, {Component} from 'react';
import {Button, Switch} from "@material-ui/core";
import {getNotify, getUserId, getUsername} from "../../../../actions/user";
import {refresh, update} from "../../../../actions/api";

class UpdateNotification extends Component {


    constructor(props) {
        super(props);
        this.state = {
            notify: getNotify()
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        if(e.target.id === "notify" && !(getNotify() === this.state.notify)){
            this.updateDetails({notify : this.state.notify});
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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked }
        );
    }


    notificationSection() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    Notifications : OFF
                    <Switch
                        color="primary"
                        name="notify"
                        checked={this.state.notify}
                        onChange={this.onChange}
                    /> ON
                    {console.log(this.state.notify)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <form id="notify" onSubmit={this.submitHandler}>
                <p className='h3'>
                    Update Notification
                </p>
                <hr/>
                <div className="p-2 mt-4 col-8 mx-auto">
                    <div className="grey-text">
                        {/* Noticication Section */}
                        {this.notificationSection()}

                    </div>
                    <div className="text-center p-3">
                        <Button variant="outlined" color="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default UpdateNotification;