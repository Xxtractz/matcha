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
      if(response){
        window.location.replace("/login?id=ok");
      }
    })
    .catch(error => {
      console.log(error.response.data);
      window.alert(error.response.data);
    } );
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}
