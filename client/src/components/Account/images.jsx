import React, { Component } from 'react';
import {Paper, Card, CardMedia, CardActions, CardActionArea } from "@material-ui/core";

class images extends Component {
  render() {
    return (
        <Paper className="container p-2  col-12" variant="outlined">
          <Paper className="col-12 mt-2 p-1 text-center bg_secondary" variant="elevation">
            <h1>Images</h1>
            <small> All your images on your profile, These can be seen by whoever views your profile</small>
          </Paper>
          <div className="row">
          <Card className="col-md-2 p-2 m-3">
            <CardActionArea>
              <CardMedia
                className="profile_img_Card"
                image="src/assets/images/profile.png"
                title="Contemplative Reptile"
              />
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>

          <Card className="col-md-2 p-2 m-3">
            <CardActionArea>
              <CardMedia
                className="profile_img_Card"
                image="src/assets/images/profile.png"
                title="Contemplative Reptile"
              />
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>


          <Card className="col-md-2 p-2 m-3">
            <CardActionArea>
              <CardMedia
                className="profile_img_Card"
                image="src/assets/images/profile.png"
                title="Contemplative Reptile"
              />
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>



          <Card className="col-md-2 p-2 m-3">
            <CardActionArea>
              <CardMedia
                className="profile_img_Card"
                image="src/assets/images/profile.png"
                title="Contemplative Reptile"
              />
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>


          <Card className="col-md-2 p-2 m-3">
            <CardActionArea>
              <CardMedia
                className="profile_img_Card"
                image="src/assets/images/profile.png"
                title="Contemplative Reptile"
              />
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>
          </div>
        </Paper>
    );
  }
}

export default images;
