import {
  approveAdminByIdReq,
  getAllNewAdminReq,
} from '@/service/adminManage/NewAdmin.tsx';
import { message } from 'antd';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
const namespace = 'NewAdmin';
export const mapStateToProps = ({ NewAdmin, loading }) => {
  return {
    ...NewAdmin,
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    getAllNewAdmin: payload =>
      dispatch({ type: `${namespace}/getAllNewAdmin`, payload }),
    approveAdminById: payload =>
      dispatch({ type: `${namespace}/approveAdminById`, payload }),
  };
};

export default {
  namespace,
  state: {
    newAdminList: [],
  },
  effects: {
    *approveAdminById({ payload }, { call, put }) {
      const res = yield call(approveAdminByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('处理成功');
      }
    },
    *getAllNewAdmin({ payload }, { call, put }) {
      const res = yield call(getAllNewAdminReq, payload);
      const { data } = res;
      yield put({
        type: 'save',
        payload: {
          newAdminList: data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
