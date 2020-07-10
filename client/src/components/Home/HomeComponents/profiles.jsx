import React, { Component } from "react";
import { Card, CardHeader, CardMedia, CardActions, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import InfoIcon from "@material-ui/icons/Info";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { blue, red } from "@material-ui/core/colors";
import {getUserGenderPreference, getUserId, getUserLatitude, getUserLongitude} from "../../../actions/user";
import {getUsers, loadImage} from "../../../actions/api";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as geolib from 'geolib';
import sortByDistance from 'sort-by-distance';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      image:'',
      minAge: 18,
      maxAge: 70,
      infoDialog:false
    };
    this.getCardState();
  }

  getCardState(){

    const points = [
      { longitude: 3, latitude: 5},
      { longitude: 80, latitude: 34},
      { longitude: 3, latitude: 7},
      { longitude: 22, latitude: 88},
      { longitude: 100, latitude: 60},
    ]

    const opts = {
      yName: 'latitude',
      xName: 'longitude'
    }



    getUsers(
        getUserId(),
        (getUserGenderPreference()=== "Both" ? "Other":getUserGenderPreference()),
        this.state.minAge,
        this.state.maxAge
    ).then((res)=>{
      const origin = { longitude: getUserLongitude(), latitude: getUserLatitude()}
      // console.log(sortByDistance(origin,res.data, opts))
      this.setState({ cards : [...sortByDistance(origin,res.data, opts)]});
    });
  }

  info = ()=>{
    if(this.state.infoDialog){
      this.setState({ infoDialog : false});
    }else this.setState({ infoDialog : true});
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
    console.log(geolib.getDistance({latitude : getUserLatitude(), longitude: getUserLongitude()},{latitude: user.latitude, longitude : user.longitude},1));
    return (
      <div>
        <Card variant="outlined" style={{ height: "620px", width: "320px" }}>
          <CardHeader title={user.firstname +' ' + user.lastname } subheader={user.age} />
          <CardMedia
            style={{ height: "75%", paddingTop: 0 }}
            image={user.profileImage ? user.profileImage : "https://source.unsplash.com/random/720x1080-1/?human"}
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
            <IconButton aria-label="info"
                        onClick={() => {
                          this.info();
                        }}>
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

  displayImages(src){
    return(
        <div className={'col-md-3 p-1'}><Card variant="outlined" style={{ height: "320px", width: "250px" }}>
          <CardMedia
              style={{ height: "100%", paddingTop: 0 }}
              image={src}
          />
        </Card></div>
    )
  }

  viewUser(user){
    return(
        <div>
          <Dialog
              // fullWidth='320'
              maxWidth={'lg'}
              open={this.state.infoDialog}
              // onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">
              {user.firstname +' ' + user.lastname }
              <p className={'small'} >
                { user.gender === "Other" ? "Unknown":user.gender }
                { "\n "+user.age}</p>
            </DialogTitle>

            <DialogContent>
              <div className={'row'}>
                {this.displayImages(user.profileImage)}
                {user.image_1 ? this.displayImages(user.image_1): ''}
                {user.image_2 ? this.displayImages(user.image_2): ''}
                {user.image_3 ? this.displayImages(user.image_3): ''}
                {user.image_4 ? this.displayImages(user.image_4): ''}
              </div>
            </DialogContent>

            <DialogContent>
              <DialogContentText>
                {"Hi, I am attracted to "}
                {user.genderPreference === "Both" ? " Male and Female" : user.genderPreference}
              </DialogContentText>
              <p className={'lead'}>Bio</p>
              <DialogContentText>
                  {user.bio}
              </DialogContentText>
            </DialogContent>

            <DialogContent>
              <p className={'lead'}>Interests</p>
              <DialogContentText>
                {user.interest ? user.interest.toString():''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                this.info();
              }} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
  }

  render() {
    return (
      <div className="container mb-4">
        <div className="row">
          <div className="mx-auto">
            {this.state.cards.length > 0
              ? this.display(this.state.cards[0])
              : this.displayEmpty()}
            {this.state.cards.length > 0
                ? this.viewUser(this.state.cards[0])
                : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Profiles;
