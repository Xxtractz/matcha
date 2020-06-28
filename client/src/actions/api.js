import axios from "axios";
import * as _Url from "../utils/link";
import CryptoJS from "crypto-js";

function handleLogin(token, rtoken) {
  localStorage.setItem("SessionUI", "true");
  localStorage.setItem("User_Token", token);
  localStorage.setItem("refresh", rtoken);
}

function handleStoreUser(user) {
  sessionStorage.setItem("user", user);
}

function hardLogout() {
  sessionStorage.clear();
  localStorage.clear();
}

// const token = () => {
//   return localStorage.getItem("User_Token");
// };

export const register = async (userData) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    "StopShhh"
  ).toString();
  return axios
    .post(_Url.registerUserUrl, { user: encryptedData })
    .then((response) => {
      if (response) {
        console.log(response)
        return { status: "true" };
      }
    })
    .catch((error) => {
      if (error) {
        return error.response
          ? { status: "false", message: error.response.data.User }
          : { status: false };
      }
    });
};

export const refresh = async (username) => {
  return axios
    .post(_Url.refreshTokenUrl, username, { timeout: 31000 })
    .then((response) => {
      if (response) {
        if (response.status === 204) {
          return response.status;
        } else {
          handleLogin(response.data.Token, response.data.RefreshToken);
          return response.status;
        }
      }
    })
    .catch(() => {
      hardLogout();
      window.location.reload();
    });
};

export const login = (loginData) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(loginData),
    "StopShhh"
  ).toString();
  return axios
    .post(_Url.loginUserUrl, { user: encryptedData }, { timeout: 31000 })
    .then((response) => {
      console.log(response);
      if (response) {
        if (response.status === 404) {
          return response.status;
        } else {
          handleLogin(response.data.Token, response.data.RefreshToken);
          return response.status;
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else {
        return "TimeOut";
      }
    });
};

export const logout = (username) => {
  axios.post(_Url.logoutUserUrl, username, { timeout: 31000 }).then(() => {
    localStorage.clear();
    window.location.replace("/login");
  });
};

export const verify = async (token) => {
  try {
    const response = await axios.get(_Url.verifyUserAfterRegUrl + token);
    if (response) {
      return response;
    }
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return "TimeOut";
    }
  }
};

export const reverifyUser = async (email) => {
  return axios
    .post(_Url.ReverifyUrl, email, { timeout: 31000 })
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else {
        return "TimeOut";
      }
    });
};

export const Reset = async (username) => {
  return axios
    .post(_Url.forgotPasswordUrl, username, { timeout: 31000 })
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else {
        return "TimeOut";
      }
    });
};

export const update = async (id, body) => {
  return axios
    .post(_Url.updateUserById + "/" + id, body)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else {
        return "Timeout";
      }
    });
};

export const userData = async (id) => {
  return axios.get(`${_Url.usersUrl}/${id}`).then((response) => {
    handleStoreUser(JSON.stringify(response.data.User));
    return response.data.User.status;
  });
};

export const getUsers = async (gender) => {
  return axios.post(`${_Url.usersUrl}/${gender}`,{gender:gender}).then((response) => {
    // handleStoreUser(JSON.stringify(response.data.User));
    // return response.data.User.status;
    return response;
  });
};

export const loadImage = (image) => {
  return axios.request(image).then((res) => {
    console.log(res);
    return res.request.responseURL;
  })
}

export const uploadImage = (image) => {
  const unsignedUploadPreset = "odj1pwzn";
  const cloudName = "dz1whmlhr";
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  return axios.post(uploadUrl, {
    upload_preset: unsignedUploadPreset,
    file: image,
  });
};

// export const suggestedUsers = async(profile) => {
//     return axios.get(_Url.LogInUrl);
//     // axios.post(_Url.LogInUrl,_Logindata,{timeout : 31000})
//     //   .then(response => {
//     //     if(response){
//     //       if (response.status ===204) {
//     //         return response.status;
//     //       } else {
//     //         handleLogin(response.data.Token,response.data.RefreshToken);
//     //         return response.status;
//     //       }
//
//     //     }
//     //   })
//     //   .catch(error => {
//     //     if (error.response.status) {
//     //       return error.response.status;
//     //     }
//     //     else
//     //     {
//     //       return "TimeOut";
//     //     }
//     //   } );
// };
