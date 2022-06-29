export const BACKEND_URL = 'http://localhost:3009/api/v1';
export const BACKEND_URL_TOKEN = BACKEND_URL + '/token';
export const BACKEND_URL_TOKEN_CHECK = BACKEND_URL + '/user/me';

export const COMMON_GET_DOWNLOAD_TOKEN = BACKEND_URL + '/common/get_download_token';


export const USER_GET_LIST_API = BACKEND_URL + '/user/list';
export const USER_GET_CURRENT_API = BACKEND_URL + '/user/me';
export const USER_GET_BY_ID_API = BACKEND_URL + '/user/id/{id}';
export const USER_POST_CREATE = BACKEND_URL + '/user/create';
export const USER_DELETE_BY_ID = BACKEND_URL + '/user/delete/{user_id}'
export const USER_PUT_CHANGE_PASSWORD = BACKEND_URL + '/user/update_password'


export const LOAI_CONG_VAN_PREFIX = BACKEND_URL + '/cong_van/loai_cong_van'
export const LOAI_CONG_VAN_GET_LIST = LOAI_CONG_VAN_PREFIX + '/list'
export const LOAI_CONG_VAN_POST_CREATE = LOAI_CONG_VAN_PREFIX + '/create'
export const LOAI_CONG_VAN_PUT_UPDATE = LOAI_CONG_VAN_PREFIX + '/update'
export const LOAI_CONG_VAN_DELETE_BY_ID = LOAI_CONG_VAN_PREFIX + '/delete/{id}'


export const CONG_VAN_DI_PREFIX = BACKEND_URL + '/cong_van/cvdi'
export const CONG_VAN_DI_GET_LIST = CONG_VAN_DI_PREFIX + '/list'
export const CONG_VAN_DI_POST_CREATE = CONG_VAN_DI_PREFIX + '/create'
export const CONG_VAN_DI_POST_UPDATE_TEP_DINH_KEM = CONG_VAN_DI_PREFIX + '/update/tep_dinh_kem'
export const CONG_VAN_DI_GET_BY_ID = CONG_VAN_DI_PREFIX + '/{id}'
export const CONG_VAN_DI_DELETE_BY_ID = CONG_VAN_DI_PREFIX + '/delete/{id}'


export const CONG_VAN_VERSION_PREFIX = BACKEND_URL + '/cong_van/version'
export const CONG_VAN_VERSION_DOWNLOAD_TEP_DINH_KEM = CONG_VAN_VERSION_PREFIX + '/{cong_van_di_version_id}/download/tep_dinh_kem'


export const STATIC_TABLE_GET_LIST = BACKEND_URL + '/{static_table_name}/list';
export const STATIC_TABLE_POST_CREATE = BACKEND_URL + '/{static_table_name}/create';
export const STATIC_TABLE_GET_RESET_CACHE = BACKEND_URL + '/{static_table_name}/reset_cache';
export const STATIC_TABLE_PUT_UPDATE = BACKEND_URL + '/{static_table_name}/update';
export const STATIC_TABLE_DELETE_BY_ID = BACKEND_URL + '/{static_table_name}/delete/{id}';


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
  