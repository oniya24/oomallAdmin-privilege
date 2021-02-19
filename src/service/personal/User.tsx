import { request } from 'umi';

interface updateAdminParams {
  name: String;
  avatar: String;
  mobile: String;
  email: String;
}
export const updateUserReq = (params: updateAdminParams) => {
  return request('adminusers', {
    method: 'put',
    data: params,
  });
};

export const getUserReq = () => {
  return request('adminusers');
};

export const updatePasswordReq = (data: any) => {
  return request('adminusers/password', {
    method: 'put',
    data: data,
  });
};

export const sendAuthCodeReq = (data: any) => {
  return request('adminusers/password/reset', {
    method: 'put',
    data: data,
  });
};

/** 查询当前管理员所有权限 */
export const getAdminState = () => {
  return request('adminusers/states');
};

/** 登录系统 */
export const loginAdminReq = (params: any) => {
  return request('privileges/login', {
    method: 'post',
    data: params,
  });
};

/** 登出系统 */
export const logoutUserReq = (params: any) => {
  return request('privileges/logout');
};
