import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button, TextField, Select, MenuItem } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  getUserFirstName,
  getUserLastName,
  getUsername,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
  getUserInterest,
} from "../../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["Input"],
      temptag: "",
      isopen: true,
      firstname: getUserFirstName(),
      lastname:getUserLastName(),
    };
  }

  submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username.toString(),
      password: this.state.password.toString(),
    };
  };

  onChange = (e) => {
    console.log(e.target.name+":"+ e.target.value);
    
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  // Form Sections
  nameSection() {
    return (
      <div className="row mb-3">
        <div className="col-6">
          <InputLabel>First Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="firstname"
            defaultValue={this.state.firstname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
        <div className="col-6 ">
          <InputLabel>Last Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="lastname"
            defaultValue={this.state.lastname}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
      </div>
    );
  }

  genderSection() {
    return (
      <div className="row mb-3">
        <div className="col-6 ">
          <InputLabel>Gender</InputLabel>
          <Select
            native
            // alue={getUserGender()}
            // onChange={handleChange}
            // inputProps={{
            //   name: "age",
            //   id: "age-native-simple",
            // }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Other"}>Other</option>
            <option value={"Female"}>Female</option>
          </Select>
        </div>
        <div className="col-6 ">
          <InputLabel>Preferred Gender</InputLabel>
          <Select
            native
            // value={getUserGenderPreference()}
            // onChange={handleChange}
            // inputProps={{
            //   name: "age",
            //   id: "age-native-simple",
            // }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Both"}>Both</option>
            <option value={"Female"}>Female</option>
          </Select>
        </div>
      </div>
    );
  }

  bioSection() {
    return (
      <div className="row mb-3">
        <div className="col-12">
          <InputLabel>Bio</InputLabel>
          {/* <TextField
            className="col-12"
            type="text"
            name="fname"
            // placeholder={getUserFirstName()}
            // helperText={this.state.fname_err_helperText}
            // error={this.state.fname_err ? true : false}
            // value={this.state.fname}
            // 
            required
          /> */}
          <textarea
            className="w-100"
            aria-label="empty textarea"
            name="bio"
            defaultValue={getUserBio()}
            onChange={(e) => this.onChange(e)}
          ></textarea>
        </div>
      </div>
    );
  }

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  addTag = () => {
    const val = this.state.temptag;
    this.tagInput.value = null;
    if (val === "") {
      return;
    }
    if (
      this.state.tags.find(
        (tag) => tag.toString().toLowerCase() === val.toString().toLowerCase()
      )
    ) {
      return;
    }
    this.setState({ tags: [...this.state.tags, this.state.temptag] });
  };

  tagInputChange = (e) => {
    this.setState({
      temptag: [e.target.value],
    });
  };

  interestSection() {
    const { tags } = this.state;
    return (
      <div className=" row mb-3">
        <div className="col-10    ">
          <InputLabel>Interests</InputLabel>
          <div className="input-tag">
            <ul className="input-tag__tags">
              {tags.map((tag, i) => (
                <li key={tag}>
                  {tag}
                  <IconButton
                    fontSize="small"
                    style={{ padding: "5px" }}
                    type="button"
                    onClick={() => {
                      this.removeTag(i);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              <li className="input-tag__tags__input">
                <input
                  type="text"
                  onChange={this.tagInputChange}
                  ref={(c) => {
                    this.tagInput = c;
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-2 pt-3">
          <IconButton type="button" onClick={this.addTag} fontSize="large">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Paper className="container p-2 mt-4 col-12" variant="outlined">
        <Paper className="col-12 mt-2 p-1 text-center" variant="outlined">
          <h1>Profile</h1>
          <small> Details about you </small>
        </Paper>
        <div className="p-2 mt-4 col-8 mx-auto">
          <h5>
            Hi,{getUsername()}{" "}
            <small>
              <code>(to change username see Account settings)</code>{" "}
            </small>
          </h5>
          <br />
          <form onSubmit={this.submitHandler}>
            <div className="grey-text">
              {/* name Section */}
              {this.nameSection()}

              {/* Gender Section */}
              {this.genderSection()}

              {this.interestSection()}
              {this.bioSection()}
            </div>
            <div className="text-center p-3">
              <Button variant="contained" type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default UserProfile;
