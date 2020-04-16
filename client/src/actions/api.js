const axios = require("axios").default;
const _Url = require("../utils/link");

function handleLogin(token, rtoken) {
  localStorage.setItem("SessionUI", "true");
  localStorage.setItem("User_Token", token);
  localStorage.setItem("refresh", rtoken);
  // window.location.reload();
}

const token = () => {
  return localStorage.getItem("User_Token");
};

function getHeader() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token()}`,
  };
  return headers;
}

export const login = async (_Logindata) => {
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

export const register = async (_userdata) => {
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

export const verify = async (token) => {
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

export const Reverify = async (email) => {
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
