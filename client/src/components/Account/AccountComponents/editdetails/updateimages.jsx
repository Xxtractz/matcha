import React, {Component} from 'react';
import ImageUploading from "react-images-uploading";
import {Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import LoadingOverlay from "react-loading-overlay";

class UpdateImages extends Component {

    loading(message){
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
                        text={message}
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
            // this.checkAndUpload(imageList);
        };

        return (
            <div >
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
            <div className='A'>
                {this.displayImages()}
            </div>
        );
    }
}

export default UpdateImages;