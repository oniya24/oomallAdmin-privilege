import { message } from 'antd';
import { getAdminPriByIdReq } from '@/service/personal/SelfPri';

export const mapStateToProps = ({ SelfPri, loading }) => {
  const { selfPris } = SelfPri;
  return {
    selfPris,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getAdminPriById: payload =>
      dispatch({ type: 'SelfPri/getAdminPriById', payload }),
  };
};

const RoleModel = {
  namespace: 'SelfPri',
  state: {
    selfPris: [
      {
        id: 16,
        name: '查看所有代理',
        url: '/proxies',
        requestType: 0,
        gmtCreate: '2020-11-03T17:55:31',
        gmtModified: '2020-11-03T19:48:47',
      },
    ],
  },
  effects: {
    *getAdminPriById({ payload }, { call, put }) {
      const res = yield call(getAdminPriByIdReq, payload);
      const { data } = res;
      yield put({
        type: 'save',
        payload: {
          selfPris: data,
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
