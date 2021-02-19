import { request } from 'umi';

export const getAllProxyReq = ({
  did,
  ...params
}: {
  did: number;
  params: any;
}) => {
  return request(`shops/${did}/proxies`, {
    method: 'get',
    params: params,
  });
};

// 解除代理关系
export const deleteProxyByIdReq = ({
  id,
  did,
}: {
  id: number;
  did: number;
}) => {
  return request(`shops/${did}/proxies/${id}`, {
    method: 'delete',
  });
};

// 禁止代理关系
export const forbidProxyByIdReq = ({
  id,
  did,
}: {
  id: number;
  did: number;
}) => {
  return request(`proxies/${id}`, {
    method: 'delete',
  });
};

/**让id用户代理自己的权限 */
// params: {
//   "beginDate": "string",
//   "endDate": "string"
// }
export const createProxyByIdReq = ({
  id,
  ...params
}: {
  id: number;
  params: any;
}) => {
  return request(`users/${id}/proxy`, {
    method: 'post',
    data: params,
  });
};

// 管理员创建两个用户之间的代理关系
export const createProxyByA2BIdReq = ({
  aid,
  bid,
  ...params
}: {
  aid: number;
  bid: number;
  params: any;
}) => {
  return request(`ausers/${aid}/busers/${bid}`, {
    method: 'post',
    data: params,
  });
};

// 查询某个depart下的所有admin
export const getAllAdminReq = ({
  did,
  userName,
  mobile,
}: {
  did: number;
  userName: string;
  mobile: string;
}) => {
  return request(`shops/${did}/adminusers/all`, {
    params: {
      userName,
      mobile,
    },
  });
};
