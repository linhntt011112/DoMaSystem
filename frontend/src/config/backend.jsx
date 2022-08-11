export const BACKEND_URL = "http://localhost:3009/api/v1"; 
export const BACKEND_URL_TOKEN = BACKEND_URL + '/token';
export const BACKEND_URL_TOKEN_CHECK = BACKEND_URL + '/users/me';

export const COMMON_GET_DOWNLOAD_TOKEN = BACKEND_URL + '/common/get_download_token';


export const USER_GET_LIST_API = BACKEND_URL + '/users/list-short';
export const USER_GET_LIST_FULL_API = BACKEND_URL + '/users/list-full';
export const USER_GET_CURRENT_API = BACKEND_URL + '/users/me';
export const USER_GET_BY_ID_API = BACKEND_URL + '/users/{id}';
export const USER_POST_CREATE = BACKEND_URL + '/users/';
export const USER_DELETE_BY_ID = BACKEND_URL + '/users/{user_id}'
export const USER_PUT_CHANGE_PASSWORD = BACKEND_URL + '/users/update-password'
export const USER_PUT_SELF_UPDATE = BACKEND_URL + '/users/'
export const USER_PUT_ADMIN_UPDATE = BACKEND_URL + '/users/{id}/admin-update'
export const USER_PUT_RESET_PASSWORD = BACKEND_URL + '/users/{user_id}/reset-password'


export const LOAI_CONG_VAN_PREFIX = BACKEND_URL + '/cong_van/loai_cong_van'
export const LOAI_CONG_VAN_GET_LIST = LOAI_CONG_VAN_PREFIX + '/list'
export const LOAI_CONG_VAN_POST_CREATE = LOAI_CONG_VAN_PREFIX + '/create'
export const LOAI_CONG_VAN_PUT_UPDATE = LOAI_CONG_VAN_PREFIX + '/update'
export const LOAI_CONG_VAN_DELETE_BY_ID = LOAI_CONG_VAN_PREFIX + '/delete/{id}'


export const CONG_VAN_PREFIX = BACKEND_URL + '/cong_van'
export const CONG_VAN_GET_LIST_CVDEN = CONG_VAN_PREFIX + '/cvden'
export const CONG_VAN_GET_LIST_CVDI = CONG_VAN_PREFIX + '/cvdi'
export const CONG_VAN_GET_LIST_CHO_DUYET = CONG_VAN_PREFIX + '/list/cho_duyet'
export const CONG_VAN_GET_LIST_CHUA_DUYET = CONG_VAN_PREFIX + '/list/chua_duyet'
export const CONG_VAN_GET_LIST_CHO_XU_LY = CONG_VAN_PREFIX + '/list/cho_xu_ly'
export const CONG_VAN_GET_LIST_CHUA_XU_LY = CONG_VAN_PREFIX + '/list/chua_xu_ly'
export const CONG_VAN_DI_GET_LIST_DA_HOAN_TAT = BACKEND_URL + '/cong_van/cvdi/list/da_hoan_tat'
export const CONG_VAN_DEN_GET_LIST_DA_HOAN_TAT = BACKEND_URL + '/cong_van/cvden/list/da_hoan_tat'
export const CONG_VAN_DEN_GET_LIST_DANG_THEO_DOI = BACKEND_URL + '/cong_van/list/dang_theo_doi'
export const CONG_VAN_LUU_TRU_GET_LIST = BACKEND_URL + '/cong_van/luu_tru/list/'


export const CONG_VAN_PUT_DUYET = CONG_VAN_PREFIX + '/{id}/update/duyet'
export const CONG_VAN_PUT_XU_LY = CONG_VAN_PREFIX + '/{id}/update/xu_ly'

export const CONG_VAN_POST_CREATE = CONG_VAN_PREFIX + '/create'
export const CONG_VAN_POST_UPDATE_TEP_DINH_KEM = CONG_VAN_PREFIX + '/{id}/update/tep_dinh_kem'
export const CONG_VAN_PUT_UPDATE = CONG_VAN_PREFIX + '/{id}/update'
export const CONG_VAN_GET_BY_ID = CONG_VAN_PREFIX + '/{id}'
export const CONG_VAN_DELETE_BY_ID = CONG_VAN_PREFIX + '/{id}/delete'

export const CONG_VAN_VERSION_PREFIX = BACKEND_URL + '/cong_van/version'
export const CONG_VAN_VERSION_GET_LIST = BACKEND_URL + '/cong_van/{cong_van_id}/version/list'
export const CONG_VAN_VERSION_GET_BY_ID = BACKEND_URL + '/cong_van/{cong_van_id}/version/{version_id}'
export const CONG_VAN_VERSION_DOWNLOAD_TEP_DINH_KEM = CONG_VAN_VERSION_PREFIX + '/{cong_van_version_id}/download/tep_dinh_kem?download_token={download_token}'

export const TRAO_DOI_GET_LIST = CONG_VAN_PREFIX + '/{id}/trao_doi/list'
export const TRAO_DOI_POST_CREATE = CONG_VAN_PREFIX + '/{id}/trao_doi/create'

export const CONG_VAN_LUU_TRU_PREFIX = BACKEND_URL + '/cong_van/luu_tru'
export const CONG_VAN_LUU_TRU_POST_CREATE = CONG_VAN_LUU_TRU_PREFIX + '/create'
export const CONG_VAN_LUU_TRU_POST_UPDATE_TEP_DINH_KEM = CONG_VAN_LUU_TRU_PREFIX + '/{id}/update/tep_dinh_kem'
export const CONG_VAN_LUU_TRU_GET_BY_ID = CONG_VAN_LUU_TRU_PREFIX + '/{id}'
export const CONG_VAN_LUU_TRU_DOWNLOAD_TEP_DINH_KEM = CONG_VAN_LUU_TRU_PREFIX + '/{cong_van_id}/download/tep_dinh_kem?download_token={download_token}'
export const CONG_VAN_LUU_TRU_DELETE = CONG_VAN_LUU_TRU_PREFIX + '/{id}'
export const CONG_VAN_LUU_TRU_PUT_UPDATE = CONG_VAN_LUU_TRU_PREFIX + '/{id}'

export const UTILS_API_PREFIX = BACKEND_URL + "/utils"
export const LICH_GET_LIST_BY_USER_ID = UTILS_API_PREFIX + "/lich/?user_id={user_id}"
export const LICH_POST_CREATE = UTILS_API_PREFIX + "/lich"
export const LICH_PUT_UPDATE = UTILS_API_PREFIX + "/lich/{id}"
export const LICH_DELETE = UTILS_API_PREFIX + "/lich/{id}/delete"

export const STATIC_TABLE_PREFIX = BACKEND_URL + "/static_table"
export const STATIC_TABLE_GET_LIST = STATIC_TABLE_PREFIX + '/{static_table_name}/list';
export const STATIC_TABLE_POST_CREATE = STATIC_TABLE_PREFIX + '/{static_table_name}/create';
export const STATIC_TABLE_GET_RESET_CACHE = STATIC_TABLE_PREFIX + '/{static_table_name}/reset_cache';
export const STATIC_TABLE_PUT_UPDATE = STATIC_TABLE_PREFIX + '/{static_table_name}/update';
export const STATIC_TABLE_DELETE_BY_ID = STATIC_TABLE_PREFIX + '/{static_table_name}/delete/{id}';


export const NOTIFICATION_PREFIX = BACKEND_URL + "/notifications"
export const NOTIFICATION_GET_LIST_UNREAD = NOTIFICATION_PREFIX + "/unread"
export const NOTIFICATION_GET_LIST_READ = NOTIFICATION_PREFIX + "/read"
export const NOTIFICATION_GET_READ_ALL = NOTIFICATION_PREFIX + "/read-all"
export const NOTIFICATION_GET_READ_ID = NOTIFICATION_PREFIX + "/{id}/read"


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
  