import React, { Component } from "react";
import ImageUploading from "react-images-uploading";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { uploadImage, update } from "../../../../actions/api";
import {getUserFirstName, getUserId, getUserLastName} from "../../../../actions/user";
import LoadingOverlay from 'react-loading-overlay';

class UploadImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: getUserFirstName(),
      lastname: getUserLastName(),
      profilePictureUploaded: false,
      imageOne: false,
      imageTwo: false,
      imageThree: false,
      imageFour: false,
      profileImage: "",
      image_1:"",
      image_2:"",
      image_3:"",
      image_4:"",
      uploading: false
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.Complete();
  };

  Complete() {
    const user = {
      profileImage: this.state.profileImage,
      image_1: this.state.image_1,
      image_2: this.state.image_2,
      image_3: this.state.image_3,
      image_4: this.state.image_4,
      active: 1
    };

    console.log(user);
    if(!(this.state.profileImage === "")){
      update(getUserId(), user)
      .then((response) => {
        console.log(response);
        
        if (response.status === 200) {
          window.location.reload();
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  uploadToCloudinary(image) {
    uploadImage(image).then((res) => {
      if (res.status === 200){
        if (this.state.profileImage === "") {
          this.setState({ profileImage: res.data.secure_url });
        } else if (this.state.image_1 === "") {
          this.setState({ image_1: res.data.secure_url });
        } else if (this.state.image_2 === "") {
          this.setState({ image_2: res.data.secure_url });
        } else if (this.state.image_3 === "") {
          this.setState({ image_3: res.data.secure_url });
        }else if (this.state.image_4 === "") {
          this.setState({ image_4: res.data.secure_url });
        }
        this.setState({uploading: false});
      }
    });
  }

  checkAndUpload(imageList) {
    if (!this.state.profilePictureUploaded) {
      this.uploadToCloudinary(imageList[0].dataURL);
      this.setState({ profilePictureUploaded: true });
    } else {
      if (!this.state.imageOne && imageList.length === 2) {
        this.uploadToCloudinary(imageList[1].dataURL);
        this.setState({ imageOne: true });
      }
      if (!this.state.imageTwo && imageList.length === 3) {
        this.uploadToCloudinary(imageList[2].dataURL);
        this.setState({ imageTwo: true });
      }
      if (!this.state.imageThree  && imageList.length === 4 ) {
        this.uploadToCloudinary(imageList[3].dataURL);
        this.setState({ profilePictureUploaded: true });
      }
      if (!this.state.imageFour && imageList.length === 5) {
        this.uploadToCloudinary(imageList[4].dataURL);
        this.setState({ profilePictureUploaded: true });
      }
    }
  }

  loading(){
    return(
        <div className="overlay">
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontsize: '50px',
            color: 'white',
            transform: 'translate(-50%,-50%)',
            mstransform: 'translate(-50%,-50%)'
          }
          }>
            <LoadingOverlay
                active={true}
                spinner
                text='Uploading ...'
            >
            </LoadingOverlay>
          </div>

        </div>
    )
  }

  displayImages() {
    const maxNumber = 5;
    const maxMbFileSize = 2 * 1024 * 1024;
    const onChange = (imageList) => {
      // Checks and Upload
      this.setState({uploading : true});
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
          {({ imageList, onImageUpload, errors }) => (
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

        {this.state.uploading ? this.loading():''}
        {this.displayImages()}
      </form>
    );
  }
}

export default UploadImages;
