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

function hardLogout() {
    sessionStorage.clear();
    localStorage.clear();
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

export const refresh = async(username) => {
    return axios
        .post(_Url.refreshTokenUrl, username, { timeout: 31000 })
        .then((response) => {
            if (response) {
                console.log(response);
                if (response.status === 204) {
                    return response.status;
                } else {
                    handleLogin(response.data.Token, response.data.RefreshToken);
                    return response.status;
                }
            }
        })
        .catch((error) => {
            hardLogout();
            window.location.reload();
        });
};

export const login = async(_Logindata) => {
    return axios
        .post(_Url.loginUserUrl, _Logindata, { timeout: 31000 })
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
    axios.post(_Url.logoutUserUrl, username).then((res) => {
        localStorage.clear();
        window.location.replace("/login");
    });
};

export const register = async(_userdata) => {
    return axios
        .post(_Url.verifyUserAfterRegUrl, _userdata)
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
    return axios.get(`${_Url.usersUrl}/${id}`).then((response) => {
        handleStoreUser(JSON.stringify(response.data.User));
        return response.data.User.status;
    });
};

export const uploadImage = (image) => {
    const unsignedUploadPreset = "odj1pwzn";
    const cloudName = "dz1whmlhr";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    return axios.post(uploadUrl, {
        upload_preset: unsignedUploadPreset,
        file: image,
    });
};

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