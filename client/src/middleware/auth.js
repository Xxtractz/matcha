const axios = require('axios').default;
const _Url = require('../utils/link');

export const login = (data) => {
}

export const logout = () => {
  localStorage.clear();
}

export const register = (_userdata) =>{
  axios.post(_Url.signInUrl,_userdata )
    .then(response => { 
      console.log("Before True");
      console.log(response);
      return true;
    })
    .catch(error => {
        console.log(error.response.data);
        console.log("Before false");
        return false;
    });
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}
