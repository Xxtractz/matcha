import { json } from "body-parser";

export const login = (data) => {
  localStorage.setItem("SessionUI", 'TestLogin');
  localStorage.setItem("user", '{"firstname":"Musa","lastname":"Baloyi"}')
}

export const logout = () => {
  localStorage.removeItem("SessionUI");
}

export const register = (data) =>{
  
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}
