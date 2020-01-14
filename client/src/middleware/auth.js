const axios = require('axios').default;
const _Url = require('../utils/link');

function handleLogin(token,rtoken) {
  localStorage.setItem("SessionUI","true");
  localStorage.setItem("User_Token",token);
  localStorage.setItem("refresh",rtoken);
  window.location.reload();
}

export const login = async (_Logindata) => {
  return axios.post(_Url.LogInUrl,_Logindata,{timeout : 3000})
    .then(response => {
      if(response){
        if (response.status ===204) {
          return response.status;
        } else {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
          handleLogin(response.data.Token,response.data.RefreshToken);
          return response.status;
        }
        
      }
    })
    .catch(error => {
      if (error.response.status) {
        return error.response.status;
      }
      else
      {
        return "TimeOut";
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
