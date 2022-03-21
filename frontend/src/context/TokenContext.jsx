import { useState, useEffect, createContext, useContext } from 'react';
import {BACKEND_URL_TOKEN_CHECK} from '../config/backend'
import decodeJwt from 'jwt-decode';
// import { UserContext } from './UserContext';
// import { useToken } from './useToken';


const localStorageToken = "DMSToken";


export function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem(localStorageToken);
    const userToken = tokenString;
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    // localStorage.setItem(localStorageToken, JSON.stringify(userToken));
    localStorage.setItem(localStorageToken, userToken);
    if (!userToken) localStorage.removeItem(localStorageToken);
    setToken(userToken);
  };


  const allUserPermissions = new Set(['user', 'admin']);
  const getUserPermission = () => {
    // console.log(token);
    // console.log(decodeJwt(token) );
    try{
      if (token !== null || token !== undefined) return  decodeJwt(token).permissions
      
    } catch(e) {}
    return null
  };

  const [userPermission, setUserPermission] = useState(getUserPermission());


  useEffect(() => {
    const checkUserPermisison = async () => {
      setUserPermission(getUserPermission());
      if (!allUserPermissions.has(userPermission)) {
        setUserPermission(null);
        setToken(null);
      }
      // console.log(userPermission);
    };
    checkUserPermisison();
    // try{checkUserPermisison();
    // } catch(e) { 
    //   setUserPermission(null);
    //   setToken(null);
    // }
  }, [token]);

  return {
    token: token,
    setToken: saveToken, 
    userPermission: userPermission,
    setUserPermission: setUserPermission,
  }
}

