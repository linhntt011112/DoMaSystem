export const BACKEND_URL = 'http://localhost:3009/api/v1';
export const BACKEND_URL_TOKEN = BACKEND_URL + '/token';
export const BACKEND_URL_TOKEN_CHECK = BACKEND_URL + '/user/me';

export const USER_GET_LIST_API = BACKEND_URL + '/user/list';
export const USER_GET_CURRENT_API = BACKEND_URL + '/user/me';
export const USER_GET_BY_ID_API = BACKEND_URL + '/user/id/{id}';
export const USER_POST_CREATE = BACKEND_URL + '/user/create';
export const USER_DELETE_BY_ID = BACKEND_URL + '/user/delete/{user_id}'


export const STATIC_TABLE_GET_LIST = BACKEND_URL + '/{static_table_name}/list';


export const makeRequest = async (method, url, token, body=null, contentType="application/json", delete_contentType=false) => {
  let requestOptions = {
    method: method,
    // mode: 'no-cors',
    headers: {
      // "Access-Control-Request-Private-Network": true,
      "Content-Type": contentType,
      Authorization: "Bearer " + token,
    },
  };
  if (body !== null) requestOptions.body = body;
  if (delete_contentType) delete requestOptions.headers["Content-Type"];
  // console.log(token);

  return fetch(url, requestOptions);
};
  