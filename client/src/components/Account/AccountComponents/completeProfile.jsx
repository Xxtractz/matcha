import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
  getUserInterest,
} from "../../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import {
  disabledFormInput,
  selecFormInput,
  textAreaFormInput,
} from "../../Form/form";
class CompleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        firstname: getUserFirstName(),
        lastname: getUserLastName(),
        gender: getUserGender(),
        genderPreference: getUserGenderPreference(),
        interest: getUserInterest(),
        bio: getUserBio(),
      },
      image1: "src/assets/images/addImage.png",
      image2: "src/assets/images/addImage.png",
      image3: "src/assets/images/addImage.png",
      image4: "src/assets/images/addImage.png",
      image5: "src/assets/images/addImage.png",
      tags: [],
      temptag: "",
      isopen: true,
      photoUrl: "src/assets/images/addImage.png",
      genderOptions: ["Male", "Female", "Both"],
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {
    console.log(e.target.name + ":" + e.target.value);

    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  photoUpload(e, name) {
    e.preventDefault();
    // name.preventDefault();
    console.log('====================================');
    console.log([name]);
    console.log('====================================');
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        [name]: reader.result,
      });
    };
    
    reader.readAsDataURL(file);
  //   name = null;
  }

  imageTemplate = (name,defaultValue) => {
    return (
      <label htmlFor="image-upload">
        <div className="image-upload-container" style={{}}>
          <img src={defaultValue} alt="" />
          <input
            id="image-upload"
            type="file"
            accept=".jpg, .jpeg"
            onChange={(e) => this.photoUpload(e,name)}
          />
        </div>
      </label>
    );
  }

  displayImages() {
    return (
      <div>
        {this.imageTemplate("image1",this.state.image1)}
        {this.imageTemplate("image2",this.state.image2)}
        {this.imageTemplate("image3",this.state.image3)}
        {this.imageTemplate("image4",this.state.image4)}
        {this.imageTemplate("image5",this.state.image5)}
      </div>
    );
  }

  ImageSection() {
    return <div className="row ">{this.displayImages()}</div>;
  }

  // Form Sections
  nameSection() {
    return (
      <div className="row mb-3">
        {disabledFormInput(
          "First Name",
          "col-12",
          "text",
          "firstname",
          this.state.profile.firstname
        )}
        {disabledFormInput(
          "Last Name",
          "col-12",
          "text",
          "lastname",
          this.state.profile.lastname
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
          this.state.profile.gender,
          (e) => this.onChange(e),
          this.state.genderOptions
        )}
        {selecFormInput(
          "col-6",
          "Preferred Gender",
          "genderPreference",
          this.state.profile.genderPreference,
          (e) => this.onChange(e),
          this.state.genderOptions
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
          this.state.profile.bio,
          (e) => this.onChange(e)
        )}
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
          className="col-12 mt-2 p-1 text-center bg-transparent"
          variant="outlined"
        >
          <h1>Complete Profile</h1>
          <small> Please Complete you Profile</small>
        </Paper>

        <form onSubmit={this.submitHandler}>
          {this.ImageSection()}
          <br />
          <br />
          {this.personalDetailsSection()}

          <div className="text-center p-3">
            <Button variant="contained" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default CompleteProfile;
