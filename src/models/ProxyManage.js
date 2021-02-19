import {
  Effect,
  ImmerReducer,
  Reducer,
  Subscription,
  history,
  dispatch,
} from 'umi';
import {
  getAllProxyReq,
  ProxyByIdReq,
  createProxyByIdReq,
  createProxyByA2BIdReq,
  deleteProxyByIdReq,
  getAllAdminReq,
  forbidProxyByIdReq,
} from '@/service/ProxyManage';
import { message } from 'antd';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';

export const mapStateToProps = ({ ProxyManage, loading }) => {
  const {
    proxyList,
    adminList,
    proxyTotal,
    proxyPage,
    proxyPageSize,
  } = ProxyManage;
  return {
    proxyList,
    adminList,
    proxyTotal,
    proxyPage,
    proxyPageSize,
    loginLoading: loading.effects['Login/login'],
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getAllProxy: payload =>
      dispatch({ type: 'ProxyManage/getAllProxy', payload }),
    deleteProxyById: payload =>
      dispatch({ type: 'ProxyManage/deleteProxyById', payload }),
    getAllAdmin: payload =>
      dispatch({ type: 'ProxyManage/getAllAdmin', payload }),
    createProxyById: payload =>
      dispatch({ type: 'ProxyManage/createProxyById', payload }),
    createProxyByA2BId: payload =>
      dispatch({ type: 'ProxyManage/createProxyByA2BId', payload }),
    savePagination: payload =>
      dispatch({ type: 'ProxyManage/savePagination', payload }),
    forbidProxyById: payload =>
      dispatch({ type: 'ProxyManage/forbidProxyById', payload }),
  };
};

export default {
  namespace: 'ProxyManage',
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
    proxyTotal: 0,
    proxyPage: 1,
    proxyPageSize: 10,
    proxyList: [
      {
        id: 1,
        userAId: 49,
        userBId: 47,
        beginDate: '2020-10-03T18:51:42',
        endDate: '2021-11-03T18:51:52',
        gmtCreate: '2020-11-03T18:52:00',
        signature:
          'bb1378ee78a41e6a37abd37aa2247af1f2962fc229ca84cf53981fb6b2fe37bc',
        valid: 1,
        departId: 0,
      },
      {
        id: 2,
        userAId: 49,
        userBId: 46,
        beginDate: '2020-05-03T18:52:25',
        endDate: '2020-10-03T18:52:31',
        gmtCreate: '2020-11-03T18:52:37',
        signature:
          '006d2a321a041446b8c19f33bda62c49bdefe6bd12705d1be50c45dedb4842bb',
        valid: 1,
        departId: 0,
      },
    ],
  },
  effects: {
    *getAllProxy({ payload }, { call, put }) {
      const res = yield call(getAllProxyReq, payload);
      const { data, total } = res;
      yield put({
        type: 'save',
        payload: {
          proxyList: data,
          proxyTotal: total,
        },
      });
    },
    *deleteProxyById({ payload }, { call, put }) {
      const res = yield call(deleteProxyByIdReq, payload);
    },
    *getAllAdmin({ payload }, { call, put }) {
      const res = yield call(getAllAdminReq, payload);
      const { data } = res;
      let { list, total, page, pageSize } = data;
      // history.push("/personal")
      if (total > page * pageSize) {
        const newRes = yield call(getAllAdminReq, payload);
        list = newRes.data.list;
      }
      yield put({
        type: 'save',
        payload: {
          adminList: list,
        },
      });
    },
    *createProxyById({ payload }, { call, put }) {
      const res = yield call(createProxyByIdReq, payload);
      const { code, errmsg } = res;
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *createProxyByA2BId({ payload }, { call, put }) {
      const res = yield call(createProxyByA2BIdReq, payload);
      const { code, errmsg } = res;
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *forbidProxyById({ payload }, { call, put }) {
      const res = yield call(forbidProxyByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('禁止成功');
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    savePagination(state, action) {
      const { page, pageSize } = action.payload;
      return {
        ...state,
        ...{
          proxyPage: page,
          proxyPageSize: pageSize,
        },
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  //   subscriptions: {
  //     setup({ dispatch, history }) {
  //       return history.listen(({ pathname }) => {
  //         if (pathname === '/') {
  //           dispatch({
  //             type: 'query',
  //           })
  //         }
  //       });
  //     }
  //   }
};
