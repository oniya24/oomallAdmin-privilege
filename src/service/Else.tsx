import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查看浏览记录
export const getFootprintReq = ({
  did,
  ...params
}: {
  did: number;
  params: any;
}) => {
  return request(`/shops/${did}/footprints`, {
    params: params,
  });
};

// 查询日志
export const getLogReq = ({ did, ...params }: { did: number; params: any }) => {
  return request(`/shops/${did}/logs`, {
    params: params,
  });
};

// 查询日志
export const deleteLogReq = ({
  did,
  ...params
}: {
  did: number;
  params: any;
}) => {
  return request(`/shops/${did}/logs`, {
    method: 'delete',
  });
};
