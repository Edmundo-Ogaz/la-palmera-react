// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('logged_user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  export const getLoggedUser = () => {
    const userStr = sessionStorage.getItem('logged_user');
    if (userStr) return JSON.parse(userStr);
    else return false;
  }

  export const setLoggedUser = (isLogged) => {
    sessionStorage.setItem('logged_user', JSON.stringify(isLogged));
  }