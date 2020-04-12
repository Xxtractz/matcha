const jwt = require("jsonwebtoken");
var Token = localStorage.getItem("User_Token");
const data = jwt.decode(Token, "matchSecrets");
const axios = require("axios").default;
const _Url = require("../utils/link");

export const getUserid = () =>{
  return data._id;
}

export const getUsername = () => {
  return data.username;
};

export const getUserFirstName = () => {
  return data.firstname;
};

export const getUserLastName = () => {
  return data.lastname;
};

export const getUserGender = () =>{
  return data.gender;
}

export const getUserEmail = () =>{
  return data.email;
}

export const getUserGenderPreference = () =>{
  return data.genderPreference;
}

export const getUserBio = () =>{
  return data.bio;
}

export const getUserAge = () =>{
  return data.age;
}

export const getUserImages = () =>{
  return data.images;
}

export const getUserStatus = () =>{
  return data.status;
}

export const getUserInterest = () =>{
  return data.interets;
}

export const suggestedUsers = async (profile) => {
  return axios.get(_Url.LogInUrl);
  // axios.post(_Url.LogInUrl,_Logindata,{timeout : 31000})
  //   .then(response => {
  //     if(response){
  //       if (response.status ===204) {
  //         return response.status;
  //       } else {
  //         handleLogin(response.data.Token,response.data.RefreshToken);
  //         return response.status;
  //       }

  //     }
  //   })
  //   .catch(error => {
  //     if (error.response.status) {
  //       return error.response.status;
  //     }
  //     else
  //     {
  //       return "TimeOut";
  //     }
  //   } );
};
