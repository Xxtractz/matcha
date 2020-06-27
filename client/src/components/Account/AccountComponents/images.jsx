import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import {getImageFour, getImageOne, getImageThree, getImageTwo, getProfilePicture} from "../../../actions/user";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";

class images extends Component {
  display(image) {
    return (
      <div className="col-sm">
        <Card className="image-section">
          <CardActionArea>
            <CardMedia component="img" height="140" src={image} />
          </CardActionArea>
        </Card>
      </div>
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
        <div className="row m-3">
          <div className="col-md">
            <Card className="image-section">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  src={getProfilePicture()}
                />
              </CardActionArea>
            </Card>
          </div>
          {getImageOne()?this.display(getImageOne()):''}
          {getImageTwo()?this.display(getImageTwo()):''}
          {getImageThree()?this.display(getImageThree()):''}
          {getImageFour()?this.display(getImageFour()):''}
        </div>
        <div className="text-center p-3">
          <Button variant="outlined" color="primary" type="submit" href="/user#updateImages">
            Update
          </Button>
        </div>
      </Paper>
    );
  }
}

export default images;
