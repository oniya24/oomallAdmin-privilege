import { request } from 'umi';
// byId ???

// 查询某个depart下的所有admin
export const getAllAdminReq = ({
  did,
  ...params
}: {
  did: number;
  params: any;
}) => {
  return request(`shops/${did}/adminusers/all`, {
    params: params,
  });
};

// 获取某个id的admin信息
export const getAdminByIdReq = ({ did, id }: { did: number; id: number }) => {
  return request(`shops/${did}/adminusers/${id}`);
};

// 通过id对admin进行更新
export const updateAdminByIdReq = ({
  did,
  id,
  ...params
}: {
  did: number;
  id: number;
  params: any;
}) => {
  return request(`shops/${did}/adminusers/${id}`, {
    method: 'put',
    data: params,
  });
};

// 通过id删除某个admin
export const deleteAdminByIdReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`shops/${did}/adminusers/${id}`, {
    method: 'delete',
  });
};

// 释放用户
export const releaseAdminByIdReq = ({
  did,
  id,
}: {
  id: number;
  did: number;
}) => {
  return request(`shops/${did}/adminusers/${id}/release`, {
    method: 'put',
  });
};

// 禁止用户
export const forbidAdminByIdReq = ({
  did,
  id,
}: {
  id: number;
  did: number;
}) => {
  return request(`shops/${did}/adminusers/${id}/forbid`, {
    method: 'put',
  });
};

// 为某个id添加角色
export const addRoleFromAdminReq = ({
  did,
  userid,
  roleid,
}: {
  did: number;
  userid: number;
  roleid: number;
}) => {
  return request(`shops/${did}/adminusers/${userid}/roles/${roleid}`, {
    method: 'post',
  });
};

// 删除某个用户的角色
export const cancelRoleFromAdminReq = ({
  did,
  userid,
  roleid,
}: {
  did: number;
  userid: number;
  roleid: number;
}) => {
  return request(`shops/${did}/adminusers/${userid}/roles/${roleid}`, {
    method: 'delete',
  });
};

// 获取用户的角色
export const getRoleByDidReq = ({ did, id }: { did: number; id: number }) => {
  return request(`shops/${did}/adminusers/${id}/roles`);
};

// 查询有哪些角色
// 根据did获取Role信息
export const getAllRoleByDidReq = (did: number) => {
  return request(`shops/${did}/roles`);
};
