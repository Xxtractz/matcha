import React, { Component } from "react";
import ImageUploading from "react-images-uploading";

class UploadImages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profileImage: '',
      defaultimage: 'src/assets/images/addImage.png',
      file: ""
    };
  }

  photoUpload = (e) => {
    e.preventDefault();
    console.log("====================================");
    console.log(e.target.name);
    console.log("====================================");
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        profileImage: reader.result,
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

  profilePicture() {
    return (
      <label htmlFor="image-upload">
        <div className="image-upload-container" style={{}}>
          <img src={this.state.profileImage === '' ? this.state.defaultimage : this.state.profileImage} alt="" />
          <input
            id="image-upload"
            name="profilePicture"
            type="file"
            accept=".jpg, .jpeg"
            onChange={(e) => this.photoUpload(e)}
          />
        </div>
      </label>
    );
  }

  displayImages() {
    const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
    console.log(imageList);
  };
  return (
    <div className="App">
      <ImageUploading multiple onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button onClick={onImageUpload}>Upload images</button>&nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map(image => (
              <div key={image.key} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button
                    onClick={() => {
                      image.onUpdate();
                    }}
                  >
                    Update
                  </button>
                  <button onClick={image.onRemove}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
    // return (
    //   <div>
    //     {this.profilePicture()}
    //     {/* {this.imageTemplate("image2", this.state.image2)}
    //     {this.imageTemplate("image3", this.state.image3)}
    //     {this.imageTemplate("image4", this.state.image4)}
    //     {this.imageTemplate("image5", this.state.image5)} */}
    //   </div>
    // );
  }


  render() {
    return <div>{this.displayImages()}</div>;
  }
}

export default UploadImages;
