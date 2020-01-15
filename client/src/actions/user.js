const jwt = require('jsonwebtoken');
var Token = localStorage.getItem("User_Token");
const data = jwt.decode(Token,'matchSecrets');

/**
 * data.fname == firstname
 * data.lname == last name
 * data.email == email
 * data.username == username
 * data.age == age
 * data.gender == gender
 */

export const getUserName = () => {
  return data.fname;
    // return userdata.firstname.toString();
  }
export const getUserLastName = () => {
  return data.lname;
    // return userdata.lastname.toString();
  }