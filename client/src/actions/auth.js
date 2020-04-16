export const isloggedIn = () => {
    if (localStorage.getItem("SessionUI")) {
      return true;
    } else return false;
  };