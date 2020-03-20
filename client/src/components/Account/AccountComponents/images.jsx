import React, { Component } from 'react';
import {Paper } from "@material-ui/core";
import {getUsername} from "../../../actions/user";

class images extends Component {

  renderImage = ()=>{
    let src =  "src/assets/images/"+getUsername()+"/img_1."+"jpg";
    return(
      <div className="col-md p-2 m-3">
              <img className="img-fluid" src={src} alt=""/>
            </div>
    )
  }
  render() {
    return (
        <Paper className="container p-2  col-12" variant="outlined">
          <Paper className="col-12 mt-2 p-1 text-center bg_gradient" variant="elevation">
            <h1>Images</h1>
            <small> All your images on your profile, These can be seen by whoever views your profile</small>
          </Paper>
          <div className="row">
            {this.renderImage}
            {/* <div className="col-md-2 p-2 m-3">
              <img className="img-fluid" src="src/assets/images/profile.png" alt=""/>
            </div>
            <div className="col-md-2 p-2 m-3">
              <img className="img-fluid" src="src/assets/images/profile.png" alt=""/>
            </div>
            <div className="col-md-2 p-2 m-3">
              <img className="img-fluid" src="src/assets/images/profile.png" alt=""/>
            </div>
            <div className="col-md-2 p-2 m-3">
              <img className="img-fluid" src="src/assets/images/profile.png" alt=""/>
            </div> */}
          </div>
        </Paper>
    );
  }
}

export default images;
