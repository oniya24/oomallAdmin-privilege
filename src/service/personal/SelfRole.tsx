import { request } from 'umi';

// 获取个人的role信息
export const getSelfRolesReq = () => {
  return request('adminusers/self/roles');
};

// 查询角色权限
export const getPriFromRoleReq = (id: number) => {
  return request(`roles/${id}/privileges`);
};
