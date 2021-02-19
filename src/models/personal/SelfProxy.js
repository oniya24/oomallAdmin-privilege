import { message } from 'antd';
import {
  getAllProxyByIdReq,
  createProxyByIdReq,
  getAllAdminReq,
  deleteProxyByIdReq,
  forbidProxyByIdReq,
} from '@/service/personal/SelfProxy';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
export const mapStateToProps = ({ SelfProxy, loading }) => {
  const { selfProxies, adminList } = SelfProxy;
  return {
    selfProxies,
    adminList,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getAllProxyById: payload =>
      dispatch({ type: 'SelfProxy/getAllProxyById', payload }),
    createProxyById: payload =>
      dispatch({ type: 'SelfProxy/createProxyById', payload }),
    getAllAdmin: payload =>
      dispatch({ type: 'SelfProxy/getAllAdmin', payload }),
    deleteProxyById: payload =>
      dispatch({ type: 'SelfProxy/deleteProxyById', payload }),
    forbidProxyById: payload =>
      dispatch({ type: 'SelfProxy/forbidProxyById', payload }),
  };
};

const RoleModel = {
  namespace: 'SelfProxy',
  state: {
    adminList: [
      {
        userName: '8043300005',
        id: '50',
      },
      {
        userName: '2721900002',
        id: '47',
      },
      {
        userName: '8131600001',
        id: '46',
      },
    ],
    selfProxies: [
      {
        id: 4,
        userAId: 49,
        userBId: 50,
        beginDate: '2020-11-01T18:53:59',
        endDate: '2020-12-03T18:54:07',
        gmtCreate: '2020-11-03T18:54:17',
        signature:
          'fba6d947de10ea75670dacc896e64fa393f44280ab55ff06f7a1f3333aee52b2',
        valid: 0,
        departId: 0,
      },
    ],
  },
  effects: {
    *getAllProxyById({ payload }, { call, put }) {
      const { did, id } = payload;
      const res1 = yield call(getAllProxyByIdReq, { did, aId: id });
      const res2 = yield call(getAllProxyByIdReq, { did, bId: id });
      const list = [...res1.data, ...res2.data];
      yield put({
        type: 'save',
        payload: {
          selfProxies: list,
        },
      });
    },
    *forbidProxyById({ payload }, { call, put }) {
      const res = yield call(forbidProxyByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('禁止成功');
      }
    },
    *createProxyById({ payload }, { call, put }) {
      const res = yield call(createProxyByIdReq, payload);
      const { code, errmsg } = res;
      if (isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *deleteProxyById({ payload }, { call, put }) {
      const res = yield call(deleteProxyByIdReq, payload);
      if (isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *getAllAdmin({ payload }, { call, put }) {
      const res = yield call(getAllAdminReq, payload);
      const { list } = res;
      // history.push("/personal")
      yield put({
        type: 'save',
        payload: {
          adminList: list,
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
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default RoleModel;
