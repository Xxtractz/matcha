import React, { Component } from 'react';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import {Paper,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';

class Search  extends Component {

  genderSection = () => {
    return(
      <FormControl>
        <FormLabel>Gender</FormLabel>
      </FormControl>
    )
  }
  render() {
    return (
      <div className="container mt-5 mb-4" style={{marginTop:"10px"}}>
        <Paper className="text-center" variant="outlined" square>
         {this.genderSection()}
        </Paper>
      </div>
    );
  }
}

export default Search;
 