import React, { Component } from 'react';
import './swipe.scss';
import './tinder'

// import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

// const appStyles = {
//   height: "100%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "100%",
//   minHeight: "100vh",
//   fontFamily: "sans-serif",
//   overflow: "hidden"
// };

// const wrapperStyles = { position: "relative", width: "250px", height: "250px" };
// const actionsStyles = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: 12
// };



class Profiles extends Component {
  state = {
    cards:[{ 
      "name": "Keiko",
      "age": 29,
      "phone": "(360) 454-6102",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam."
    },
    {
      "name": "Aurora",
      "age": 20,
      "phone": "(550) 100-2717",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    },
    {
      "name": "Ava",
      "age": 22,
      "phone": "(475) 388-0086",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet"
    },
    {
      "name": "Holmes",
      "age": 24,
      "phone": "(408) 516-7207",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper."
    },
    {
      "name": "Nathaniel",
      "age": 19,
      "phone": "(956) 777-6204",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate"
    },
    {
      "name": "Myles",
      "age": 29,
      "phone": "(595) 581-3353",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce"
    },
    {
      "name": "Carissa",
      "age": 18,
      "phone": "(929) 427-6563",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus."
    },
    {
      "name": "Ian",
      "age": 19,
      "phone": "(383) 951-6934",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et"
    },
    {
      "name": "Penelope",
      "age": 20,
      "phone": "(750) 538-1692",
      "about": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu."
    }]
  };

  remove = () =>
    this.setState(({ cards }) => ({ cards: cards.slice(1, cards.length) }));

  display(user){
    return(
      <div >
          <div id="app">
            <div id="people"></div>
            <div id="control">
              <div class="button no">
                <button href="#s" class="trigger"> </button>
              </div>
              <div class="button info">
                <button href="#s" class="trigger"> </button>
              </div>
              <div class="button yes">
                <button href="#s" class="trigger"> </button>
              </div>
            </div>
        </div>
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
