import React, { Component } from "react";

import { Card, CardHeader, CardMedia, CardActions } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import InfoIcon from "@material-ui/icons/Info";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { blue, red } from "@material-ui/core/colors";
import { getUserGenderPreference} from "../../../actions/user";
import {getUsers, loadImage} from "../../../actions/api";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      image:''
    };
    this.getCardState();
  }

  getCardState(){
    getUsers(getUserGenderPreference()).then((res)=>{
      this.setState({ cards : [...res.data]});
    });
  }

  like = (user) => {
      console.log(user + " Was Liked");
      this.remove();
  };

  dislike = (user) => {
    console.log(user + " Was disLiked");
    this.remove();
  };

  loadimage(imgUrl){
    loadImage(imgUrl).then(res =>
        {
          console.log(res);
          this.setState({image : res})
        }
    )
    return this.state.image;
  }

  remove = () => {
    this.setState(({ cards }) => ({ cards: cards.slice(1, cards.length) }));
  };

  display(user) {
    return (
      <div>
        <Card variant="outlined" style={{ height: "620px", width: "320px" }}>
          <CardHeader title={user.firstname +' ' + user.lastname } subheader={user.age} />
          <CardMedia
            style={{ height: "75%", paddingTop: 0 }}
            image={user.profileImage}
            title={user.firstname +' ' + user.lastname }
          />
          <CardActions className="pl-5">
            <IconButton
              aria-label="Like"
              onClick={() => {
                this.like(user.firstname);
              }}
            >
              <FavoriteTwoToneIcon style={{ fontSize: 36, color: red[500] }} />
            </IconButton>
            <IconButton aria-label="Like">
              <InfoIcon style={{ fontSize: 36, color: blue[300] }} />
            </IconButton>
            <IconButton
              aria-label="dislike"
              onClick={() => {
                this.dislike(user.firstname);
              }}
            >
              <ThumbDownIcon style={{ fontSize: 36, color: red[600] }} />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }

  handleResponse(type) {
    console.log(type);
  }

  displayEmpty() {
    return <div>Theres Nothing to display</div>;
  }

  render() {
    return (
      <div className="container mb-4">
        <div className="row">
          <div className="mx-auto">
            {this.state.cards.length > 0
              ? this.display(this.state.cards[0])
              : this.displayEmpty()}
          </div>
        </div>
      </div>
    );
  }
}

export default Profiles;
