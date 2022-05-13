import { useState, useEffect, createContext, useContext } from 'react';
import {useCookies} from "react-cookie";
import {makeRequest, BACKEND_URL_TOKEN_CHECK} from '../config/backend'
import decodeJwt from 'jwt-decode';
// import { UserContext } from './UserContext';
// import { useToken } from './useToken';


const localStorageToken = "MarkitoneToken";
const localStorageUserPermissions = "MarkitonePermission";
const cookieToken = "MarkitoneToken";


export function useToken() {
  const [cookies, setCookie, removeCookie] = useCookies([cookieToken]);
  const getToken = () => {
    // const tokenString = localStorage.getItem(localStorageToken);
    const tokenString = cookies[cookieToken];
    const userToken = tokenString;
    return userToken === undefined ? null: userToken
  };

  const [token, setToken] = useState(getToken());
  // console.log(token);

  const saveToken = userToken => {
    
    if (!userToken) removeCookie(cookieToken);
    else setCookie(cookieToken, userToken, { path: '/' });
    // console.log(userToken)
    setToken(userToken);
  };


  useEffect(() => {
    const checkToken = async () => {
      // const response = await makeRequest("GET", BACKEND_URL_TOKEN_CHECK, token);
      // if (!response.ok){
      //   // console.log(response);
      //   saveToken(null);
      // }
    };
    checkToken();
  }, []);


  return {
    token: token,
    setToken: saveToken
  }
}



export function useUserInfo() {
  const [cookies, setCookie, removeCookie] = useCookies([cookieToken]);
  const getToken = () => {
    // const tokenString = localStorage.getItem(localStorageToken);
    const tokenString = cookies[cookieToken];
    const userToken = tokenString;
    return userToken === undefined ? null: userToken
  };

  const checkToken = (decodedToken) => {
    const exp = (decodedToken === null) ? (new Date()).getTime()/1000 - 10000 : decodedToken.exp;
    // console.log(exp, (new Date()).getTime()/1000, decodedToken)
    // console.log(token, decodedToken, exp < (new Date()).getTime(), !allUserPermissions.has(userPermission));
    if (exp < (new Date()).getTime()/1000 || !allUserPermissions.has(userPermission)) {
      return false
    }
    return true
      // console.log(userPermission);
  }; 

  const decodeToken = () => {
    const token = getToken();
    let decodedToken = null;
    try{
      if (token !== null || token !== undefined) decodedToken = decodeJwt(token);
      if (!checkToken(decodedToken)) decodedToken = null;
      console.log(checkToken(decodeToken), decodedToken);
    } catch(e) {}
    
    
    return decodedToken;
  };


  const allUserPermissions = new Set(['not_active', 'user', 'admin']);

  let decodedToken = decodeToken();
  const [userPermission, setUserPermission] = useState(decodedToken === null ? null: decodedToken.permissions);
  const [user, setUser] = useState({name: decodedToken === null ? null: decodedToken.sub});


  return {
    userPermission: userPermission,
    setUserPermission: setUserPermission,
    user: user,
    setUser: setUser
  }
}
