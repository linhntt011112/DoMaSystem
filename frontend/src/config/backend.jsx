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


export const CONG_VAN_PREFIX = BACKEND_URL + '/cong_van'
export const CONG_VAN_GET_LIST_CHO_DUYET = CONG_VAN_PREFIX + '/list/cho_duyet'
export const CONG_VAN_GET_LIST_CHUA_DUYET = CONG_VAN_PREFIX + '/list/chua_duyet'
export const CONG_VAN_GET_LIST_CHO_XU_LY = CONG_VAN_PREFIX + '/list/cho_xu_ly'
export const CONG_VAN_GET_LIST_CHUA_XU_LY = CONG_VAN_PREFIX + '/list/chua_xu_ly'
export const CONG_VAN_DI_GET_LIST_DA_HOAN_TAT = BACKEND_URL + '/cong_van/cvdi/list/da_hoan_tat'
export const CONG_VAN_DEN_GET_LIST_DA_HOAN_TAT = BACKEND_URL + '/cong_van/cvden/list/da_hoan_tat'


export const CONG_VAN_PUT_DUYET = CONG_VAN_PREFIX + '/{id}/update/duyet'

export const CONG_VAN_POST_CREATE = CONG_VAN_PREFIX + '/create'
export const CONG_VAN_POST_UPDATE_TEP_DINH_KEM = CONG_VAN_PREFIX + '/update/tep_dinh_kem'
export const CONG_VAN_PUT_UPDATE = CONG_VAN_PREFIX + '/{id}/update'
export const CONG_VAN_GET_BY_ID = CONG_VAN_PREFIX + '/{id}'
export const CONG_VAN_DELETE_BY_ID = CONG_VAN_PREFIX + '/{id}/delete'


export const CONG_VAN_VERSION_PREFIX = BACKEND_URL + '/cong_van/version'
export const CONG_VAN_VERSION_DOWNLOAD_TEP_DINH_KEM = CONG_VAN_VERSION_PREFIX + '/{cong_van_version_id}/download/tep_dinh_kem?download_token={download_token}'

export const CONG_VAN_LUU_TRU_PREFIX = BACKEND_URL + '/cong_van/luu_tru'
export const CONG_VAN_LUU_TRU_POST_CREATE = CONG_VAN_LUU_TRU_PREFIX + '/create'
export const CONG_VAN_LUU_TRU_POST_UPDATE_TEP_DINH_KEM = CONG_VAN_LUU_TRU_PREFIX + '/update/tep_dinh_kem'

export const STATIC_TABLE_PREFIX = BACKEND_URL + "/static_table"
export const STATIC_TABLE_GET_LIST = STATIC_TABLE_PREFIX + '/{static_table_name}/list';
export const STATIC_TABLE_POST_CREATE = STATIC_TABLE_PREFIX + '/{static_table_name}/create';
export const STATIC_TABLE_GET_RESET_CACHE = STATIC_TABLE_PREFIX + '/{static_table_name}/reset_cache';
export const STATIC_TABLE_PUT_UPDATE = STATIC_TABLE_PREFIX + '/{static_table_name}/update';
export const STATIC_TABLE_DELETE_BY_ID = STATIC_TABLE_PREFIX + '/{static_table_name}/delete/{id}';


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
  