import React, { Component } from "react";

class UploadImages extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

    photoUpload = (e) => {
    e.preventDefault();
    console.log("====================================");
    console.log(e.target);
    console.log("====================================");
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        [e.target.name]: reader.result,
      });
    };

    reader.readAsDataURL(file);
    window.removeEventListener("resize", this.photoUpload);
  };

  imageTemplate = (name, defaultValue) => {
    return (
      <label htmlFor="image-upload">
        <div className="image-upload-container" style={{}}>
          <img src={defaultValue} alt="" />
          <input
            id="image-upload"
            name="image2"
            type="file"
            accept=".jpg, .jpeg"
            onChange={(e) => this.photoUpload(e)}
          />
        </div>
      </label>
    );
  };

  image1() {
    return (
      <label htmlFor="image-upload">
        <div className="image-upload-container" style={{}}>
          {/* <img src={this.state.image1} alt="" /> */}
          <input
            id="image-upload"
            name="image1"
            type="file"
            accept=".jpg, .jpeg"
            onChange={(e) => this.photoUpload(e)}
          />
        </div>
      </label>
    );
  }

  displayImages() {
    return (
      <div>
        {this.image1()}
        {/* {this.imageTemplate("image2", this.state.image2)}
        {this.imageTemplate("image3", this.state.image3)}
        {this.imageTemplate("image4", this.state.image4)}
        {this.imageTemplate("image5", this.state.image5)} */}
      </div>
    );
  }


  render() {
  return <div>{this.displayImages()}</div>;
  }
}

export default UploadImages;
