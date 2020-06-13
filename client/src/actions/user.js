const jwt = require("jsonwebtoken");
const Token = localStorage.getItem("User_Token");
const data = jwt.decode(Token, "matchSecrets");

export const getUserId = () => {
    return data._id;
};

export const getUsername = () => {
    return data.username;
};

export const getUserFirstName = () => {
    return data.firstname;
};

export const getUserLastName = () => {
    return data.lastname;
};

export const getUserGender = () => {
    return data.gender;
};

export const getUserEmail = () => {
    return data.email;
};

export const getUserGenderPreference = () => {
    return data.genderPreference;
};

export const getUserBio = () => {
    return data.bio;
};

export const getUserAge = () => {
    return data.age;
};

export const getUserImages = () => {
    return data.images;
};

export const getUserStatus = () => {
    return data.status;
};

export const getUserInterest = () => {
    return data.interests;
};

export const getProfilePicture = () => {
    return data.profileImage;
}