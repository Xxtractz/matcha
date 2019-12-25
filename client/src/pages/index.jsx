import React, { Component } from 'react'

// Components
import Nav from '../components/nav'
class index extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <div className="container-fluid pt-5 mt-5">
                    <div className="row">
                        <div className="col-3">
                            Im side bar
                        </div>
                        <div className="col-9">
                            Im main content
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
