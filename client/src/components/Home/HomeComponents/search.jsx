import React, { Component } from "react";
import {
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@material-ui/core";
import Slider from '@material-ui/core/Slider'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      genderValue: "",
      ageMin: 18,
      ageMax: 70,
      locationDistance: 0,
    };
  }

  handleSearch = () => {
    console.log("Handle Search");
  };

  handleChangeAge = (event, newValue) => {
    this.setState({ ageMin: newValue[0], ageMax: newValue[1] });
  };

  handleChangeGender = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeLocation = (event, number) => {
    this.setState({ locationDistance: number });
  };

  valuetext = (value) => {
    return value;
  };

  genderSection = () => {
    return (
      <FormControl component="fieldset">
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          aria-label="position"
          name="genderValue"
          value={this.state.genderValue}
          onChange={this.handleChangeGender}
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female"
            labelPlacement="top"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
            labelPlacement="top"
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label="Other"
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  locationSection = () => {
    const marks = [
      {
        value: 5,
        label: "5km",
      },
      {
        value: 45,
        label: "45km",
      },
      {
        value: 100,
        label: "100km",
      },
      {
        value: 150,
        label: "150km",
      },
    ];
    return (
      <FormControl component="fieldset">
        <FormLabel>Location</FormLabel>
        <div style={{ width: 170 }}>
          <Slider
            max={170}
            value={this.state.locationDistance}
            onChange={this.handleChangeLocation}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => this.valuetext()}
            marks={marks}
          />
        </div>
      </FormControl>
    );
  };

  ageSection = () => {
    const marks = [
      {
        value: 18,
        label: "18",
      },
      {
        value: 35,
        label: "35",
      },
      {
        value: 50,
        label: "50",
      },
      {
        value: 70,
        label: "70",
      },
    ];

    return (
      <FormControl component="fieldset">
        <FormLabel>Age Range</FormLabel>
        <div style={{ width: 150 }}>
          <Slider
            min={18}
            max={70}
            value={[this.state.ageMin, this.state.ageMax]}
            onChange={this.handleChangeAge}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => this.valuetext()}
            marks={marks}
          />
        </div>
      </FormControl>
    );
  };

  render() {
    return (
      <div className="container mt-5 mb-4" style={{ marginTop: "10px" }}>
        <Paper className="text-center pt-3 pl-3 pr-3" variant="outlined" square>
          <div className="header text-center">
            {" "}
            <h3>Filter Search</h3>{" "}
            <Button className="primary  " onClick={this.handleSearch}>
              Click here to Search/Filter
            </Button>
          </div>
          <hr />
          <div className="row">
            <div className="col text-center">{this.ageSection()}</div>
            <div className="col">{this.genderSection()}</div>
            <div className="col">{this.locationSection()}</div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Search;
