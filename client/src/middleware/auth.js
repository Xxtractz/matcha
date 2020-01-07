const axios = require('axios');
const signInUrl = require('../utils/link').signInUrl;

export const login = (data) => {
  localStorage.setItem("SessionUI", 'TestLogin');
  localStorage.setItem("user", '{"firstname":"Musa","lastname":"Baloyi"}')
}

export const logout = () => {
  localStorage.clear();
}

export const register = (_userdata) =>{
  axios.post(signInUrl,_userdata )
    .then(response => { 
      console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });
  
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}
