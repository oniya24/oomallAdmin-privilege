import { request } from 'umi';
import { pagination } from '@/const/interface.tsx';

// 管理员查询SPU所有预售活动(包括下线的)
export const getAllPresalesReq = ({
  shopId,
  ...params
}: {
  shopId: number;
  params: any;
}) => {
  return request(`/shops/${shopId}/presales`, {
    params: params,
  });
};
interface SkuData {
  name: string;
  advancePayPrice: number;
  restPayPrice: number;
  quantity: number;
  beginTime: string;
  payTime: string;
  endTime: string;
}
// 管理员新增SKU预售活动
export const postCreatePresaleReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: SkuData;
}) => {
  return request(`/shops/${shopId}/skus/${id}/presales`, {
    method: 'post',
    data: data,
  });
};

// 管理员修改SKU预售活动
export const putModifyPresaleReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: SkuData;
}) => {
  return request(`/shops/${shopId}/presales/${id}`, {
    method: 'put',
    data: data,
  });
};

// 管理员逻辑删除SKU预售活动
export const deletePresaleReq = ({
  shopId,
  id,
  ...data
}: {
  shopId: number;
  id: number;
  data: SkuData;
}) => {
  return request(`/shops/${shopId}/presales/${id}`, {
    method: 'delete',
  });
};

// 管理员上线预售活动
export const putOnshelvesPresaleReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/presales/${id}/onshelves`);
};

// 管理员下架预售活动
export const putOffshelvesPresaleReq = ({
  shopId,
  id,
}: {
  shopId: number;
  id: number;
}) => {
  return request(`/shops/${shopId}/presales/${id}/offshelves`);
};
