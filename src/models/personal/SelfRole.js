import { message } from 'antd';
import {
  getSelfRolesReq,
  getPriFromRoleReq,
} from '@/service/personal/SelfRole';

export const mapStateToProps = ({ SelfRole, loading }) => {
  const { selfRoles, rolePriList } = SelfRole;
  console.log(SelfRole);
  return {
    selfRoles,
    rolePriList,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getSelfRoles: payload =>
      dispatch({
        type: 'SelfRole/getSelfRoles',
        payload,
      }),
    getPriFromRole: payload =>
      dispatch({
        type: 'SelfRole/getPriFromRole',
        payload,
      }),
  };
};

const RoleModel = {
  namespace: 'SelfRole',
  state: {
    selfRoles: [
      {
        id: 81,
        user: {
          id: 50,
          userName: '8043300005',
        },
        role: {
          id: 86,
          name: '库管',
        },
        creator: {
          id: 1,
          userName: '13088admin',
        },
        gmtCreate: '2020-11-01T09:48:24',
      },
    ],
    rolePriList: [
      {
        id: 30,
        role: {
          id: 23,
          name: '管理员',
        },
        privilege: {
          id: 30,
          name: '店家下线店铺',
        },
        creator: {
          id: 1,
          username: '13088admin',
        },
        gmtModified: '2020-11-01T10:11:21',
      },
    ],
  },
  effects: {
    *getSelfRoles({ payload }, { call, put }) {
      const res = yield call(getSelfRolesReq, payload);
      const { data } = res;
      yield put({
        type: 'save',
        payload: {
          selfRoles: data || [],
        },
      });
    },
    *getPriFromRole({ payload }, { call, put }) {
      const res = yield call(getPriFromRoleReq, payload);
      const { data } = res;
      yield put({
        type: 'save',
        payload: {
          rolePriList: data || [],
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
