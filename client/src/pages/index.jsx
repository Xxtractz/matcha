import React, { Component } from 'react'

// Components
import Nav from '../components/nav'
class index extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Nav></Nav>
                <div className="row pt-5 mt-5">
                    <div className="col-3">
                        Im side bar
                    </div>
                    <div className="col-9">
                        Im main content
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
