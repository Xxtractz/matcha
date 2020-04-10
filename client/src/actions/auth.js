const axios = require('axios').default;
const _Url = require('../utils/link');

function handleLogin(token,rtoken) {
  localStorage.setItem("SessionUI","true");
  localStorage.setItem("User_Token",token);
  localStorage.setItem("refresh",rtoken);
  // window.location.reload();
}

export const login = async (_Logindata) => {
  return axios.post(_Url.LogInUrl,_Logindata,{timeout : 31000})
    .then(response => {
      if(response){
        if (response.status === 204) {
          return response.status;
        } else {
          handleLogin(response.data.Token,response.data.RefreshToken);
          return response.status;
        }
      }
    })
    .catch(error => {
      if (error.response) {
        return error.response;
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

export const verify = (token) => {
  return axios.get(_Url.VerifyUrl + token)
  .then(response => {
    if(response){
        return response;
    }
  })
  .catch(error => {
    if (error.response) {
      return error.response;
    }
    else
    {
      return "TimeOut";
    }
  } );
}


export const Reverify = async (email) => {
  return axios.post(_Url.ReverifyUrl,email,{timeout : 31000})
    .then(response => {
      if(response){
        return response;
      }
    })
    .catch(error => {
      if (error.response) {
        return error.response;
      }
      else
      {
        return "TimeOut";
      }
    } );
}