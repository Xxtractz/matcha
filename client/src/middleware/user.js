var userdata = JSON.parse(localStorage.getItem("user"));

export const getUserName = () => {
  return "Musa";
    // return userdata.firstname.toString();
  }
export const getUserLastName = () => {
  return "Baloyi";
    // return userdata.lastname.toString();
  }