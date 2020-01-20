import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className="fourOhfour">
                <div className="col-12 text-center">
                    <h1 className="text-danger">{"404 "}</h1>
                    <h2 className="text-warning">{"{ Requested Page Not Found }"}</h2>
                    <a className="text-decoration-none text-success btn btn-outline" href="/">Go home</a>
                </div>
            </div>
        )
    }
}

export default NotFound;