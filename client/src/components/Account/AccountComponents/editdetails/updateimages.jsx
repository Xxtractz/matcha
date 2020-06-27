import React, {Component} from 'react';
import ImageUploading from "react-images-uploading";
import {Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import LoadingOverlay from "react-loading-overlay";
import {
    getImageFour,
    getImageOne,
    getImageThree,
    getImageTwo,
    getProfilePicture,
    getUserId
} from "../../../../actions/user";
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
                    window.location = ""
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    uploadToCloudinary(imageTitle,image){
        uploadImage(image).then((res) => {
            if (res.status === 200){
                this.setState({uploadingMessage: "Almost there..."});
                if (imageTitle === "profileImage") {
                    this.updateProfileImages({profileImage: res.data.secure_url});
                } else if (imageTitle === "image_1") {
                    this.updateProfileImages({image_1: res.data.secure_url});
                } else if (imageTitle === "image_2"){
                    this.updateProfileImages({image_2: res.data.secure_url});
                } else if (imageTitle === "image_3"){
                    this.updateProfileImages({image_3: res.data.secure_url});
                } else if (imageTitle === "image_4"){
                    this.updateProfileImages({image_4: res.data.secure_url});
                }
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

    updateImage_1(){
        return (
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <Button className='ml-4' disabled>Image 1</Button>
                        {this.display(getImageOne())}
                    </div>
                    <div className='col-6'>
                        {this.displayImages("image_1","Update First Image")}
                    </div>
                </div>

            </div>
        );
    }
    updateImage_2(){
        return (
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <Button className='ml-4' disabled>Image 2</Button>
                        {this.display(getImageTwo())}
                    </div>
                    <div className='col-6'>
                        {this.displayImages("image_2","Update Second Image")}
                    </div>
                </div>

            </div>
        );
    }

    updateImage_3(){
        return (
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <Button className='ml-4' disabled>Image 3</Button>
                        {this.display(getImageThree())}
                    </div>
                    <div className='col-6'>
                        {this.displayImages("image_3","Update Third Image")}
                    </div>
                </div>

            </div>
        );
    }

    updateImage_4(){
        return (
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <Button className='ml-4' disabled>Image 4</Button>
                        {this.display(getImageFour())}
                    </div>
                    <div className='col-6'>
                        {this.displayImages("image_4","Update Fourth Image")}
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
            this.setState({uploading : true});
            this.setState({uploadingMessage: "Uploading Image..."});
        };

        return (
            <div className="m-1">
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
                {this.state.uploading ? this.loading():''}
                {this.updateProfilePicture()}
                {getImageOne()?this.updateImage_1():this.displayImages("image_1","Add First Image")}
                {getImageTwo()?this.updateImage_2():this.displayImages("image_2","Add Second Image")}
                {getImageThree()?this.updateImage_3():this.displayImages("image_3","Add Third Image")}
                {getImageFour()?this.updateImage_4():this.displayImages("image_4","Add Fourth Image")}
                {/*{this.displayImages()}*/}
            </div>
        );
    }
}

export default UpdateImages;