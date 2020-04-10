const jwt = require('jsonwebtoken');
var Token = localStorage.getItem("User_Token");
const data = jwt.decode(Token,'matchSecrets');
const axios = require('axios').default;
const _Url = require('../utils/link');

/**
 * data.fname == firstname
 * data.lname == last name
 * data.email == email
 * data.username == username
 * data.age == age
 * data.gender == gender
 */

 export const getUsername = () => {
   return data.username;
 }

export const getUserFirstName = () => {
  return data.fname;
  }

export const getUserLastName = () => {
  return data.lname;
  }


  export const suggestedUsers = async (profile) => {
    return  axios.get(_Url.LogInUrl);
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
  }
