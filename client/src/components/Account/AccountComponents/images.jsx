import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { getProfilePicture } from "../../../actions/user";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

class images extends Component {
  display() {
    return (
      <Card className="image-section">
        <CardActionArea>
          <CardMedia component="img" height="140" src={getProfilePicture()} />
        </CardActionArea>
      </Card>
    );
  }
  render() {
    return (
      <Paper className="container p-2  col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center" variant="outlined">
          <h1>Images</h1>
          <small>
            {" "}
            All your images on your profile, These can be seen by whoever views
            your profile
          </small>
        </Paper>
        <div className="upload__image-wrapper "></div>
        <div className="row">
          <Card className="image-section">
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                src={getProfilePicture()}
              />
            </CardActionArea>
          </Card>
          {this.display()}
          {this.display()}
          {this.display()}
          {this.display()}
        </div>
      </Paper>
    );
  }
}

export default images;
