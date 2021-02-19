import {
  getPriFromRoleReq,
  addPriToRoleByIdReq,
  cancelPriFromRoleByIdReq,
  getAllPrivilegeReq,
  getRoleByDidReq,
  postRoleByDidReq,
  deleteRoleByDidReq,
  putRoleByDidReq,
} from '@/service/RoleManage';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';

export const mapStateToProps = ({ RoleManage, loading }) => {
  const {
    priList,
    roleList,
    rolePriList,
    roleTotal,
    rolePage,
    rolePageSize,
  } = RoleManage;
  return {
    priList,
    roleTotal,
    rolePage,
    rolePageSize,
    roleList,
    rolePriList,
    // loginLoading: loading.effects['RoleManage/login']
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getRoleByDid: payload =>
      dispatch({ type: 'RoleManage/getRoleByDid', payload }),
    deleteRoleByDid: payload =>
      dispatch({ type: 'RoleManage/deleteRoleByDid', payload }),
    postRoleByDid: payload =>
      dispatch({ type: 'RoleManage/postRoleByDid', payload }),
    putRoleByDid: payload =>
      dispatch({ type: 'RoleManage/putRoleByDid', payload }),
    getAllPrivilege: payload =>
      dispatch({ type: 'RoleManage/getAllPrivilege', payload }),
    getPriFromRole: payload =>
      dispatch({ type: 'RoleManage/getPriFromRole', payload }),
    savePagination: payload =>
      dispatch({ type: 'RoleManage/savePagination', payload }),
    addPriToRoleById: payload =>
      dispatch({ type: 'RoleManage/addPriToRoleById', payload }),
    cancelPriFromRoleById: payload =>
      dispatch({ type: 'RoleManage/cancelPriFromRoleById', payload }),
  };
};
export default {
  namespace: 'RoleManage',
  state: {
    priList: [
      {
        gmtCreate: '2020-11-01T09:52:20',
        gmtModified: '2020-11-02T21:51:45',
        id: 2,
        name: '查看任意用户信息',
        requestType: 0,
        url: '/adminusers/{id}',
      },
    ],
    roleTotal: 0,
    rolePage: 1,
    rolePageSize: 10,
    rolePriList: [],
    roleList: [
      {
        id: 23,
        name: '管理员',
        desc: '超级管理员，所有权限都有',
        createdBy: 1,
        departId: 0,
        gmtCreate: '2020-11-01T09:48:24',
        gmtModified: '2020-11-01T09:48:24',
      },
      {
        id: 80,
        name: '财务',
        desc: null,
        createdBy: 1,
        departId: 0,
        gmtCreate: '2020-11-01T09:48:24',
        gmtModified: '2020-11-01T09:48:24',
      },
    ],
  },
  effects: {
    *getRoleByDid({ payload }, { call, put }) {
      const { data } = yield call(getRoleByDidReq, payload);
      const { list } = data;
      yield put({
        type: 'save',
        payload: {
          roleList: list,
        },
      });
    },
    *getAllPrivilege({ payload }, { call, put }) {
      const { data } = yield call(getAllPrivilegeReq, payload);
      let { list, total, page, pageSize } = data;
      if (total > page * pageSize) {
        const { data } = yield call(getAllPrivilegeReq, {
          page: 1,
          pageSize: total,
        });
        list = data.list;
      }
      yield put({
        type: 'save',
        payload: {
          priList: list,
        },
      });
    },
    *addPriToRoleById({ payload }, { call, put }) {
      const res = yield call(addPriToRoleByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('权限添加成功');
      }
    },
    *cancelPriFromRoleById({ payload }, { call, put }) {
      const res = yield call(cancelPriFromRoleByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('权限删除成功');
      }
    },
    *postRoleByDid({ payload }, { call, put }) {
      const res = yield call(postRoleByDidReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('新建成功');
      }
    },
    *deleteRoleByDid({ payload }, { call, put }) {
      const res = yield call(deleteRoleByDidReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putRoleByDid({ payload }, { call, put }) {
      const res = yield call(putRoleByDidReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *getPriFromRole({ payload }, { call, put }) {
      const { data } = yield call(getPriFromRoleReq, payload);
      yield put({
        type: 'save',
        payload: {
          rolePriList: data,
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
    savePagination(state, action) {
      const { page, pageSize } = action.payload;
      return {
        ...state,
        ...{
          rolePage: page,
          rolePageSize: pageSize,
        },
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};
