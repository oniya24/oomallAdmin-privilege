import { request } from 'umi';
// 认证用户
export const approveAdminByIdReq = ({
  did,
  id,
  ...data
}: {
  id: number;
  did: number;
  data: any;
}) => {
  return request(`shops/${did}/adminusers/${id}/approve`, {
    method: 'put',
    data: data,
  });
};

export const getAllNewAdminReq = (did: number) => {
  return request(`shops/${did}/adminusers/allnew`, {
    method: 'get',
  });
};
