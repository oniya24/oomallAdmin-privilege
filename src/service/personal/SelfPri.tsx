import { request } from 'umi';

export const getAdminPriByIdReq = ({
  did,
  id,
}: {
  did: number;
  id: number;
}) => {
  return request(`shops/${did}/adminusers/${id}/privileges`);
};
