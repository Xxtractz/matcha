const axios = require('axios').default;
const _Url = require('../utils/link');

export const login = (data) => {
}

export const logout = () => {
  localStorage.clear();
}

export const register = (_userdata) =>{
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
