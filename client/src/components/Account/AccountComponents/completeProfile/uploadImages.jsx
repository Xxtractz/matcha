import React, { Component } from "react";
import ImageUploading from "react-images-uploading";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { uploadImage, update } from "../../../../actions/api";
import { getUserid } from "../../../../actions/user";

class UploadImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePictureUploaded: false,
      imageOne: false,
      imageTwo: false,
      imageThree: false,
      imageFour: false,
      profileImage: "",
      Images: [],
      defaultimage: "src/assets/images/addImage.png",
      file: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.Complete();
  };

  Complete() {
    const user = {
      status: "2",
      profileImage: this.state.profileImage,
      // images: this.state.Images,
    };

    console.log(user);

    update(getUserid(), user)
      .then((response) => {
        console.log(response);
        
        // if (response.status === 200) {
        //   this.setState({ stepOne: false });
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uploadToCloudinary(image) {
    uploadImage(image).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.secure_url);
      if (this.state.profileImage === "") {
        this.setState({ profileImage: res.data.secure_url });
      } 
      // else {
      //   this.setState({ tags: [...this.state.Images, res.data.secure_url] });
      // }
    });
  }

  checkAndUpload(imageList) {
    if (!this.state.profilePictureUploaded) {
      this.uploadToCloudinary(imageList[0].dataURL);
      this.setState({ profilePictureUploaded: true });
    }
    // } else {
    //   if (!this.state.imageOne && imageList[1].dataURL.legnth < 1) {
    //     this.uploadToCloudinary(imageList[1].dataURL);
    //     this.setState({ imageOne: true });
    //   }
    //   if (!this.state.imageTwo && imageList[2].dataURL) {
    //     this.uploadToCloudinary(imageList[2].dataURL);
    //     this.setState({ imageTwo: true });
    //   }
    //   if (!this.state.imageThree && imageList[3].dataURL) {
    //     this.uploadToCloudinary(imageList[3].dataURL);
    //     this.setState({ profilePictureUploaded: true });
    //   }
    //   if (!this.state.imageFour && imageList[4].dataURL) {
    //     this.uploadToCloudinary(imageList[4].dataURL);
    //     this.setState({ profilePictureUploaded: true });
    //   }
    // }
  }

  displayImages() {
    const maxNumber = 1;
    const maxMbFileSize = 2 * 1024 * 1024;
    const onChange = (imageList) => {
      // Checks and Upload
      this.checkAndUpload(imageList);
    };

    return (
      <div className="App">
        <ImageUploading
          multiple
          onChange={onChange}
          maxNumber={maxNumber}
          maxFileSize={maxMbFileSize}
          acceptType={["jpg", "gif", "png"]}
        >
          {({ imageList, onImageUpload, onImageRemoveAll, errors }) => (
            <div className="upload__image-wrapper ">
              <Button
                variant="outlined"
                color="primary"
                onClick={onImageUpload}
              >
                Upload Image
              </Button>
              &nbsp;
              <div
                className={
                  errors.acceptType ||
                  errors.maxNumber ||
                  errors.maxFileSize ||
                  errors.resolution
                    ? "alert alert-danger m-3"
                    : ""
                }
              >
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allow</span>
                )}
                {errors.maxFileSize && (
                  <span>Selected file size exceed maxFileSize</span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
              <div className="row">
                {imageList.map((image) => (
                  <Card className="image-section" key={image.key}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={image.dataURL}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <Button
            className="mb-3"
            variant="contained"
            color="primary"
            type="submit"
            // onClick={this.Complete()}
          >
            Complete
          </Button>
        </div>
        {this.displayImages()}
      </form>
    );
  }
}

export default UploadImages;
