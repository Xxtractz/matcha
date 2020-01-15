import React, { Component } from 'react';
import { Button, Card, CardMedia, CardActions, CardActionArea } from "@material-ui/core";

class images extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
        <Card className="col-md p-2 m-3">
          <CardActionArea>
            <CardMedia
              className="profile_img_Card"
              image="src/assets/images/profile.png"
              title="Contemplative Reptile"
            />
              <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
        <Card className="col-md p-2 m-3">
          <CardActionArea>
            <CardMedia
              className="profile_img_Card"
              image="src/assets/images/profile.png"
              title="Contemplative Reptile"
            />
              <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
        <Card className="col-dd p-2 m-3">
          <CardActionArea>
            <CardMedia
              className="profile_img_Card"
              image="src/assets/images/profile.png"
              title="Contemplative Reptile"
            />
              <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
        <Card className="col-md p-2 m-3">
          <CardActionArea>
            <CardMedia
              className="profile_img_Card"
              image="src/assets/images/profile.png"
              title="Contemplative Reptile"
            />
              <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
        <Card className="col-md p-2 m-3">
          <CardActionArea>
            <CardMedia
              className="profile_img_Card"
              image="src/assets/images/profile.png"
              title="Contemplative Reptile"
            />
              <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
        </div>
      </div>
    );
  }
}

export default images;
