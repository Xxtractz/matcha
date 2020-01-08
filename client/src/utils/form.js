import React from 'react';
import {Button, TextField, Card, CardActions, ButtonBase} from '@material-ui/core';

export default class Form {
    formSectionRow(row_className,colSection){
        return(
          <div className={row_className}>
            {colSection}
          </div>
        )
      }
}