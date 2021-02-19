import { request } from 'umi';

export const getAdminPriviledgeReq = (id: number) => {
  return request(`adminusers/${id}/priviledge`);
};

// 获取全部权限
export const getAllPrivilege = (params: any) => {
  return request('privileges', {
    method: 'get',
    params: params,
  });
};

// 根据id对权限进行修改
// 请求参数携带以下：
// "name": "string",
// "url": "string",
// "requestType": 0
export const updatePrivilegeById = ({
  id,
  ...params
}: {
  id: number;
  params: any;
}) => {
  return request(`privilege/${id}`, {
    method: 'put',
    data: params,
  });
};
