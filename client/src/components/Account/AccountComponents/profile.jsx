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
      username: "",
      username_err: "",
      username_err_helperText: "",
      password: "",
      password_err: "",
      password_err_helperText: "",
      isopen: true,
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
            name="fname"
            helperText={this.state.fname_err_helperText}
            error={this.state.fname_err ? true : false}
            value={this.state.fname}
            defaultValue={getUserFirstName()}
            onChange={(e) => this.onChange(e)}
            required
          />
        </div>
        <div className="col-6 ">
          <InputLabel>Last Name</InputLabel>
          <TextField
            className="col-12"
            type="text"
            name="lname"
            defaultValue={getUserLastName()}
            helperText={this.state.lname_err_helperText}
            error={this.state.lname_err ? true : false}
            value={this.state.lname}
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
            value={getUserGender()}
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
            value={getUserGenderPreference()}
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
      <div className="col-8 text-center">
        {/* <TextField
            className="col-12"
            type="text"
            name="fname"
            // placeholder={getUserFirstName()}
            // helperText={this.state.fname_err_helperText}
            // error={this.state.fname_err ? true : false}
            // value={this.state.fname}
            // onChange={(e) => this.onChange(e)}
            required
          /> */}
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          value={getUserBio()}
        />
      </div>
    );
  }

  // handleDelete(i) {
  //   this.setState({
  //     tags: this.state.tags.filter((tag, index) => index !== i),
  //   });
  // }

  // handleAddition(tag) {
  //   let { tags } = this.state;
  //   this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] });
  // }

  // handleDrag(tag, currPos, newPos) {
  //   const tags = [...this.state.tags];

  //   // mutate array
  //   tags.splice(currPos, 1);
  //   tags.splice(newPos, 0, tag);

  //   // re-render
  //   this.setState({ tags });
  // }

  // handleTagClick(index) {
  //   console.log('The tag at index ' + index + ' was clicked');
  // }

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  addTag = () => {
    const val = this.state.temptag;
    // console.log(
    //   this.state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase())
    // );
    // if (
    //   this.state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase())
    // ) {
    //   return;
    // }
    this.tagInput.value = null;
    this.setState({ tags: [...this.state.tags, this.state.temptag] });
  };

  tagInputChange = (e) => {
    this.setState({
      temptag: [e.target.value],
    });
    console.log(this.state.temptag);

    // if (e.key === 'Enter' && val) {
    //   if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
    //     return;
    //   }
    //
    //   this.tagInput.value = null;
    // } else if (e.key === 'Backspace' && !val) {
    //   this.removeTag(this.state.tags.length - 1);
    // }
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
                    type="button"
                    onClick={() => {
                      this.removeTag(i);
                    }}
                  >
                    <CloseIcon  fontSize="small"/>
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
        <div className="col-2 pt-4">
          <IconButton type="button" onClick={this.addTag} fontSize="large">
            <AddCircleIcon />
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
