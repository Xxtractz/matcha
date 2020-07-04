import React, {Component} from 'react';
import {Button, InputLabel} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {getUserId, getUserInterest, getUsername} from "../../../../actions/user";
import {refresh, update} from "../../../../actions/api";

class UpdateInterests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: getUserInterest(),
            temptag: "",
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('Submited', e.target.id)
        if(e.target.id === "tags"){
            let interestToString = [];

            for (let i = 0; i < this.state.tags.length; i++) {
                interestToString = interestToString.concat(this.state.tags[i].toString().toLowerCase());
            }
            this.updateDetails({interests : interestToString});
        }
    }

    updateDetails = (user) =>{
        update(getUserId(), user)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    refresh(getUsername()).then();
                    window.location.pathname = "/";
                    window.location.hash ="";
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <code>
                        {this.state.tags_err ? this.state.tags_err_helperText : ""}
                    </code>
                </div>
                <div className="col-2 pt-3">
                    <IconButton type="button" onClick={this.addTag} fontSize="large">
                        <AddCircleIcon fontSize="large" />
                    </IconButton>
                </div>
            </div>
        );
    }

    render() {
        return (
            <form id="tags" onSubmit={this.submitHandler}>
                <p className='h3 pt-3'>
                    Update Interest
                </p>
                <hr/>
                {this.interestSection()}
                <div className="col-12 text-center">
                    <Button className='m-2' variant="outlined" color="primary" type="submit">
                        Update
                    </Button>
                </div>
                <hr/>
            </form>
        );
    }
}

export default UpdateInterests;