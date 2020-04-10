import React, { Component } from 'react';
import {Button, TextField, Card, CardActions} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

class verifyUser extends Component {


    // verify
    render() {
        return (
            <div>
                {console.log(window.location.hash)}
                {/* {(window.location.hash =)? this.displayVerify():""} */}
                
            </div>
        );
    }
}

export default verifyUser;
