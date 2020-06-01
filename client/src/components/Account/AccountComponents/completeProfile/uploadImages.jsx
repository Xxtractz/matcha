import React, { Component } from "react";
import ImageUploading from "react-images-uploading";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";

class UploadImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileImage: "",
      defaultimage: "src/assets/images/addImage.png",
      file: "",
    };
  }


  displayImages() {
    const maxNumber = 5;
    const maxMbFileSize = 2 * 1024 * 1024;
    const onChange = (imageList) => {
      // data for submit
      console.log(imageList);
      console.log(imageList[0].file.name);
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
            // write your building UI
            <div className="upload__image-wrapper ">
              <Button
                variant="outlined"
                color="primary"
                onClick={onImageUpload}
              >
                Add images
              </Button>
              &nbsp;
              {/* <Button
                variant="outlined"
                color="secondary"
                onClick={onImageRemoveAll}
              >
                Remove all images
              </Button> */}
              &nbsp;
              <Button variant="contained" color="primary">
                Send
              </Button>
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
                    {/* <CardActions>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          image.onUpdate();
                        }}
                      >
                        Update
                      </Button>
                      <br />
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={image.onRemove}
                      >
                        Remove
                      </Button>
                    </CardActions> */}
                    {/* </div> */}
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
    return <div>{this.displayImages()}</div>;
  }
}

export default UploadImages;
