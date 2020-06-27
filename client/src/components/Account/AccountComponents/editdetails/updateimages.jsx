import React, {Component} from 'react';
import ImageUploading from "react-images-uploading";
import {Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import LoadingOverlay from "react-loading-overlay";
import {getProfilePicture, getUserId} from "../../../../actions/user";
import {update, uploadImage} from "../../../../actions/api";

class UpdateImages extends Component {

    constructor(props) {
        super(props);

        this.state={
            uploading: false,
            uploadingMessage: ''
        }
    }

    updateProfileImages(imageData){
        update(getUserId(), imageData)
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                    window.location.open('/user');
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    uploadToCloudinary(imageTitle,image){
        uploadImage(image).then((res) => {
            if (res.status === 200){
                if (imageTitle === "profileImage"){
                this.updateProfileImages({profileImage: res.data.secure_url})}
            }});
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
                        text={this.state.uploadingMessage}
                    >
                    </LoadingOverlay>
                </div>

            </div>
        )
    }

    display(image) {
        return (
            <div className="col-sm">
                <Card className="image-section">
                    <CardActionArea>
                        <CardMedia component="img" height="140" src={image} />
                    </CardActionArea>
                </Card>
            </div>
        );
    }

    updateProfilePicture(){
        return (
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <Button className='ml-4' disabled>Profile Image</Button>
                        {this.display(getProfilePicture())}
                    </div>
                    <div className='col-6'>
                        {this.displayImages("profileImage","Update Profile Picture")}
                    </div>
                </div>

            </div>
        );
    }

    displayImages(imageTitle,buttonName) {
        const maxNumber = 1;
        const maxMbFileSize = 2 * 1024 * 1024;
        const onChange = (imageList) => {
            this.uploadToCloudinary(imageTitle,imageList[0].dataURL);
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
                            <Button variant="outlined" color="primary" onClick={onImageUpload}>
                                {buttonName}
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
                {this.updateProfilePicture()}
                {/*{this.displayImages()}*/}
            </div>
        );
    }
}

export default UpdateImages;