const axios = require('axios').default;
const _Url = require('../utils/link');

export const login = (data) => {
  localStorage.setItem("SessionUI", 'TestLogin');
  localStorage.setItem("user", '{"firstname":"Musa","lastname":"Baloyi"}')
}

export const logout = () => {
  localStorage.clear();
}

export const register = (_userdata) =>{
  axios.post(_Url.signInUrl,_userdata )
    .then(response => { 
      console.log(response);
      return true;
    })
    .catch(error => {
        console.log(error.response.data);
        return false;
    });
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}
