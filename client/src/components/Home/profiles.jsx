import React, { Component } from 'react';

import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

class Profiles extends Component {
  render() {
    return (
      <div className="container mb-4">
          <div className=" row">
            <div className="col-md-4 m-4 mx-auto">
              <Card className="">
                <CardActionArea>
                  <CardMedia
                    className=""
                    title="Contemplative Reptile"
                  >
                    <img className="img-fluid" src="src/assets/images/profile.png" alt="profile"/>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Mini Bio
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
      </div>
    );
  }
}

export default Profiles;
