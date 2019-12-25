var userdata = JSON.parse(localStorage.getItem("user"));

export const getUserName = () => {
    return userdata.firstname.toString();
  }
export const getUserLastName = () => {
    return userdata.lastname.toString();
  }