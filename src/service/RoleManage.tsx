import { request } from 'umi';

//给角色增加权限
export const addPriToRoleByIdReq = ({
  roleid,
  privilegeid,
}: {
  roleid: number;
  privilegeid: number;
}) => {
  return request(`roles/${roleid}/privileges/${privilegeid}`, {
    method: 'post',
  });
};

// 获取全部权限
export const getAllPrivilegeReq = (params: any) => {
  return request('privileges', {
    method: 'get',
    params: params,
  });
};

// 取消角色权限
export const cancelPriFromRoleByIdReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`shops/${did}/roleprivileges/${id}`, {
    method: 'delete',
  });
};

// 查询角色权限
export const getPriFromRoleReq = (id: number) => {
  return request(`roles/${id}/privileges`);
};

// 根据did获取Role信息
export const getRoleByDidReq = ({
  did,
  ...params
}: {
  did: number;
  params: any;
}) => {
  return request(`shops/${did}/roles`, {
    method: 'get',
    params: params,
  });
};

// 新建角色
export const postRoleByDidReq = ({
  did,
  ...params
}: {
  did: number;
  params: any;
}) => {
  // return request(`shops/${did}/roles`,{
  //   method: 'post',
  //   data: params
  // })
  return request(`roles`, {
    method: 'post',
    data: params,
  });
};

// 删除某个did下某个id对应的角色
export const deleteRoleByDidReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`shops/${did}/roles/${id}`, {
    method: 'delete',
  });
};

// 更新某个did下某个id对应的角色
export const putRoleByDidReq = ({
  did,
  id,
  ...params
}: {
  did: number;
  id: number;
  params: any;
}) => {
  return request(`shops/${did}/roles/${id}`, {
    method: 'put',
    data: params,
  });
};
