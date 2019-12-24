export const login = (data) => {
  localStorage.setItem("SessionUI", 'TestLogin');
}

export const logout = () => {
  localStorage.removeItem("SessionUI");
}

export const isloggedIn = () =>{
  if(localStorage.getItem("SessionUI")){
    return true;
  }else return false;
}