import React, { Component } from 'react';

import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import Swipeable from "react-swipy";

class Profiles extends Component {
  state = {
    cards: ["First", "Second", "Third"]
  };

  remove = () =>
    this.setState(({ cards }) => ({ cards: cards.slice(1, cards.length) }));

  display(user){
    return(
      <div>
        <Swipeable
                buttons={({ right, left }) => (
                    
                  <div><Button onClick={() => {
                    console.log("left");
                     left()}} >Reject</Button>
                  <Button onClick={() => {
                    console.log("right");
                     right()}}>Accept</Button></div>
                )}
                onAfterSwipe={this.remove}
              >
              <Card className="">
        <img className="img-fluid" src="src/assets/images/profile.png" alt="profile"/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Musa
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Mini Bio
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
                </Card>
              </Swipeable>
      </div>  
    )
  }

  handleResponse(type) {
    console.log(type);
  }
  displayEmpty(){
    return(
      <div>
        Theres Nothing to display
      </div>
    )
  }

  render() {
    return (
      <div className="container mb-4">
          <div className=" row">
            <div className="col-md-4 m-4 mx-auto">
              {this.state.cards.length > 0 ? this.display(this.state.cards[0]):this.displayEmpty()}          
            </div>
          </div>
      </div>
    );
  }
}

export default Profiles;
