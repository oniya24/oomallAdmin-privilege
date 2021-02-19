import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 查询某一时段秒杀活动详情
export const getAllFlashsalesSegmentsReq = ({ id }: { id: number }) => {
  return request(`/timesegments/${id}/flashsales`);
};

// 获取当前时段秒杀列表
export const getAllFlashsalesReq = () => {
  return request(`/flashsales/current`);
};

// 平台管理员在某个时段下新建秒杀
export const postCreateFlashsaleReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${did}/timesegments/${id}/flashsales`, {
    method: 'post',
    data: data,
  });
};

// 平台管理员删除某个时段秒杀
export const deleteFlashsaleByIdReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/flashsales/${id}`);
};

// 平台管理员在秒杀活动删除商品SKU
export const deleteFlashsaleSkuByIdReq = ({
  did,
  fid,
  id,
}: {
  did: number;
  fid: number;
  id: number;
}) => {
  return request(`/shops/${did}/flashsales/${fid}/flashitems/${id}`);
};

// 平台管理员向秒杀活动添加商品SKU
export const postAddSkuFlashsaleReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${did}/flashsales/${id}/flashitems`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改秒杀活动
export const putModifyFlashsaleReq = ({
  did,
  id,
  ...data
}: {
  did: number;
  id: number;
  data: any;
}) => {
  return request(`/shops/${did}/flashsales/${id}/flashitems`, {
    method: 'put',
    data: data,
  });
};
// 管理员上线秒杀活动
export const putOnshelvesFlashsaleReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/flashsales/${id}/onshelves`, {
    method: 'put',
  });
};

// 管理员下线秒杀活动
export const putOffshelvesFlashsaleReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`/shops/${did}/flashsales/${id}/offshelves`, {
    method: 'put',
  });
};
