import React, { Component } from "react";

import { Card, CardHeader, CardMedia, CardActions } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import InfoIcon from "@material-ui/icons/Info";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { blue, red } from "@material-ui/core/colors";
import {getProfilePicture, getUserGenderPreference} from "../../../actions/user";
import {getUsers} from "../../../actions/api";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],

    };
    this.getCardState();
  }

  getCardState(){
    getUsers(getUserGenderPreference()).then((res)=>{
      console.log(res);
      this.setState({ cards : [...res.data]});
      console.log(this.state.cards);
    });
  }

  like = () => {
    if (
      this.state.cards[0].name !== null &&
      this.state.cards[0].name !== undefined
    ) {
      console.log(this.state.cards[0].name + " Was Liked");
      this.remove();
    }
  };

  dislike = () => {
    console.log(this.state.cards[0].name + " Was disLiked");
    this.remove();
  };

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
            title="Paella dish"
          />
          <CardActions className="pl-5">
            <IconButton
              aria-label="Like"
              onClick={() => {
                this.like();
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
                this.dislike();
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
