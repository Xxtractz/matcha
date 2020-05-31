const axios = require("axios").default;
const _Url = require("../utils/link");

function handleLogin(token, rtoken) {
    localStorage.setItem("SessionUI", "true");
    localStorage.setItem("User_Token", token);
    localStorage.setItem("refresh", rtoken);
}

function handleStoreUser(user) {
    sessionStorage.setItem("user", user);
}

// const token = () => {
//   return localStorage.getItem("User_Token");
// };

// function getHeader() {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token()}`,
//   };
//   return headers;
// }


/**
 * 
 *create a funct that will keep updating local storage?? 
  look into the login as an example
 */

export const refresh = async(_Logindata) => {
    return axios
        .post(_Url.RefreshUrl, _Logindata, { timeout: 31000 })
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
        .catch((error) => {
            if (error.response) {
                return error.response;
            } else {
                return "TimeOut";
            }
        });
};



export const login = async(_Logindata) => {
    return axios
        .post(_Url.LogInUrl, _Logindata, { timeout: 31000 })
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
        .catch((error) => {
            if (error.response) {
                return error.response;
            } else {
                return "TimeOut";
            }
        });
};

export const logout = (username) => {
    axios.post(_Url.LogOutUrl, username).then((res) => {
        localStorage.clear();
        window.location.replace("/login");
    });
};

export const register = async(_userdata) => {
    return axios
        .post(_Url.signInUrl, _userdata)
        .then((response) => {
            if (response) {
                return { status: "true" };
            }
        })
        .catch((error) => {
            if (error) {
                return {
                    status: "false",
                    message: error.response.data.User,
                };
            }
        });
};

export const verify = async(token) => {
    try {
        const response = await axios.get(_Url.VerifyUrl + token);
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

export const Reverify = async(email) => {
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

export const Reset = async(username) => {
    return axios
        .post(_Url.ForgotUrl, username, { timeout: 31000 })
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

export const update = async(id, body) => {
    return axios
        .put(_Url.UpdateUrl + "/" + id, body)
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

export const userData = async(id) => {
    return axios.get(`${_Url.UserUrl}/${id}`).then((response) => {
        handleStoreUser(JSON.stringify(response.data.User));
        return response.data.User.status;
    });
};

export const uploadImage = (file) => {};

export const suggestedUsers = async(profile) => {
    return axios.get(_Url.LogInUrl);
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
};