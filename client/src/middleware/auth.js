const axios = require('axios').default;
const _Url = require('../utils/link');

export const login = async (_Logindata) => {
  return axios.post(_Url.LogInUrl,_Logindata,{timeout : 1000})
    .then(response => {
      if(response){
        if (response.status ===204) {
          return response.status;
        } else {
          return response;
        }
        
      }
    })
    .catch(error => {
      if (error) {
        return error.response.status;
        // return {
        //   status:"false",
        //   message:error.response.data.User
        // }
      }
    } );
}

export const logout = () => {
  localStorage.clear();
}

export const register = async (_userdata) =>{
  return axios.post(_Url.signInUrl,_userdata )
    .then(response => {
      if(response){
        return {status : "true"};
      }
    })
    .catch(error => {
      if (error) {
        return {
          status:"false",
          message:error.response.data.User
        }
      }
    } );
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}
