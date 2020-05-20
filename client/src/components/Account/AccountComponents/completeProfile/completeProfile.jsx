import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
  // getUserInterest,
  getUserid,
} from "../../../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import {
  disabledFormInput,
  selecFormInput,
  textAreaFormInput,
} from "../../../Form/form";
import { update, userData } from "../../../../actions/api";

class CompleteProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: getUserFirstName(),
      lastname: getUserLastName(),
      gender: "",
      genderPreference: "",
      bio: "",
      tags: [],
      temptag: "",
      isopen: true,
    };
    this.getUser();
  }

  getUser() {
    userData(getUserid()).then((response) => {
      console.log(response);
      this.setState({
        bio: response.bio,
        gender: response.gender,
        genderPreference: response.genderPreference,
      });
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.updateProfile();
  };

  updateProfile() {
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      gender: this.state.gender.toString(),
      genderPreference: this.state.genderPreference.toString(),
      bio: this.state.bio.toString(),
      interests: this.state.tags.toString(),
    };

    console.log(user);

    // update(getUserid(), user)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  onChange = (e) => {
    console.log([e.target.name] + ":" + [e.target.value]);
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

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
    console.log(this.state.tags);
  };

  nameSection() {
    return (
      <div className="row mb-3">
        {disabledFormInput(
          "First Name",
          "col-12",
          "text",
          "firstname",
          this.state.firstname
        )}
        {disabledFormInput(
          "Last Name",
          "col-12",
          "text",
          "lastname",
          this.state.lastname
        )}
      </div>
    );
  }

  genderSection() {
    return (
      <div className="row mb-3">
        {selecFormInput(
          "col-6",
          "Gender",
          "gender",
          this.state.gender,
          (e) => this.onChange(e),
          ["Male", "Female", "Both"]
        )}
        {selecFormInput(
          "col-6",
          "Preferred Gender",
          "genderPreference",
          this.state.genderPreference,
          (e) => this.onChange(e),
          ["Male", "Female", "Both"]
        )}
      </div>
    );
  }

  bioSection() {
    return (
      <div className="row mb-3">
        {textAreaFormInput(
          "col-12",
          "Bio",
          "w-100",
          "inherit",
          "bio",
          this.state.bio,
          (e) => this.onChange(e)
        )}
      </div>
    );
  }

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

  personalDetailsSection() {
    return (
      <div className="container p-2">
        <div className="col-12">{this.nameSection()}</div>
        <div className="col-12">{this.genderSection()}</div>
        <div className="col-12">{this.bioSection()}</div>
        <div className="col-12">{this.interestSection()}</div>
      </div>
    );
  }

  render() {
    return (
      <Paper
        className="container p-2  bg-transparent col-12"
        variant="outlined"
        square
      >
        <Paper
          className="col-12 m-2  text-center bg-transparent"
          variant="outlined"
        >
          <h1>Complete Profile</h1>
          <small> Please Complete you Profile</small>
        </Paper>

        <form onSubmit={this.submitHandler}>
          {this.personalDetailsSection()}

          <div className="text-center p-3">
            <Button variant="contained" type="submit">
              Next ->
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default CompleteProfile;
