export const BACKEND_URL = 'http://localhost:3009/api/v1';
export const BACKEND_URL_TOKEN = BACKEND_URL + '/token';
export const BACKEND_URL_TOKEN_CHECK = BACKEND_URL + '/user/me';

export const USER_GET_LIST_API = BACKEND_URL + '/user/list';
export const USER_GET_CURRENT_API = BACKEND_URL + '/user/me';
export const USER_GET_BY_ID_API = BACKEND_URL + '/user/id/{id}';


export const makeRequest = async (method, url, token) => {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // console.log(token);
  
    return fetch(url, requestOptions);
  };
  