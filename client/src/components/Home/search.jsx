import React, { Component } from 'react';

import {Paper} from '@material-ui/core';

class Search  extends Component {
  render() {
    return (
      <div className="container mt-5 mb-4" style={{marginTop:"10px"}}>
        <Paper className="text-center" variant="outlined" square>
          FIlter
        </Paper>
      </div>
    );
  }
}

export default Search;
 