import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  getAllAdminReq,
  getAdminByIdReq,
  updateAdminByIdReq,
  deleteAdminByIdReq,
  forbidAdminByIdReq,
  releaseAdminByIdReq,
  getAllRoleByDidReq,
  cancelRoleFromAdminReq,
  addRoleFromAdminReq,
  getRoleByDidReq,
} from '@/service/adminManage/Admin.tsx';
import { message } from 'antd';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';

export const mapStateToProps = ({ AdminManage, loading }) => {
  const {
    adminList,
    adminInfo,
    adminRoleList,
    allRoleList,
    adminTotal,
    adminPage,
    adminPageSize,
  } = AdminManage;
  return {
    adminList,
    adminInfo,
    adminRoleList,
    allRoleList,
    adminTotal,
    adminPage,
    adminPageSize,
    getAllAdminLoading: loading.effects['AdminManage/getAllAdmin'],
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getAllAdmin: payload =>
      dispatch({ type: 'AdminManage/getAllAdmin', payload }),
    getAdminById: payload =>
      dispatch({ type: 'AdminManage/getAdminById', payload }),
    updateAdminById: payload =>
      dispatch({ type: 'AdminManage/updateAdminById', payload }),
    deleteAdminById: payload =>
      dispatch({ type: 'AdminManage/deleteAdminById', payload }),
    forbidAdminById: payload =>
      dispatch({ type: 'AdminManage/forbidAdminById', payload }),
    releaseAdminById: payload =>
      dispatch({ type: 'AdminManage/releaseAdminById', payload }),
    approveAdminById: payload =>
      dispatch({ type: 'AdminManage/approveAdminById', payload }),
    getAllRoleByDid: payload =>
      dispatch({ type: 'AdminManage/getAllRoleByDid', payload }),
    getRoleByDid: payload =>
      dispatch({ type: 'AdminManage/getRoleByDid', payload }),
    cancelRoleFromAdmin: payload =>
      dispatch({ type: 'AdminManage/cancelRoleFromAdmin', payload }),
    addRoleFromAdmin: payload =>
      dispatch({ type: 'AdminManage/addRoleFromAdmin', payload }),
    savePagination: payload =>
      dispatch({ type: 'AdminManage/savePagination', payload }),
  };
};

export default {
  namespace: 'AdminManage',
  state: {
    // name: '123456',
    adminList: [
      {
        userName: '8043300005',
        id: '50',
        depart_id: 0,
      },
      {
        userName: '8131600001',
        id: '46',
        depart_id: 1,
      },
    ],
    adminTotal: 0,
    adminPage: 1,
    adminPageSize: 10,
    adminInfo: {
      // "id": 0,
      // "userName": "string",
      // "mobile": "string",
      // "name": "string",
      // "email": "string",
      // "avatar": "string",
      // "lastLoginTime": "string",
      // "lastLoginIp": "string",
      // "status": 0,
      // "depart_id": 0,
      // "gmtCreate": "string",
      // "gmtModified": "string"
    },
    allRoleList: [
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
      {
        id: 81,
        name: '客服',
        desc: null,
        createdBy: 1,
        departId: 0,
        gmtCreate: '2020-11-01T09:48:24',
        gmtModified: '2020-11-01T09:48:24',
      },
      {
        id: 82,
        name: '运营部',
        desc: null,
        createdBy: 1,
        departId: 0,
        gmtCreate: '2020-11-01T09:48:24',
        gmtModified: '2020-11-01T09:48:24',
      },
    ],
    adminRoleList: [
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
  },
  effects: {
    *getAllAdmin({ payload }, { call, put }) {
      console.log('getAdminReq');
      const { data } = yield call(getAllAdminReq, payload);
      const { list } = data;
      // history.push("/personal")
      yield put({
        type: 'save',
        payload: {
          adminList: list,
        },
      });
    },
    *getAdminById({ payload }, { call, put }) {
      const res = yield call(getAdminByIdReq, payload);
      const { data, total } = res;
      yield put({
        type: 'save',
        payload: {
          adminInfo: data,
          adminTotal: total,
        },
      });
    },
    *deleteAdminById({ payload }, { call, put }) {
      const res = yield call(deleteAdminByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *updateAdminById({ payload }, { call, put }) {
      const res = yield call(updateAdminByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *releaseAdminById({ payload }, { call, put }) {
      const res = yield call(releaseAdminByIdReq, payload);
    },
    *forbidAdminById({ payload }, { call, put }) {
      const res = yield call(forbidAdminByIdReq, payload);
    },
    *getAllRoleByDid({ payload }, { call, put }) {
      const res = yield call(getAllRoleByDidReq, payload);
      const { list } = res.data;
      yield put({
        type: 'save',
        payload: {
          allRoleList: list,
        },
      });
    },
    *getRoleByDid({ payload }, { call, put }) {
      const res = yield call(getRoleByDidReq, payload);
      const { data } = res;
      yield put({
        type: 'save',
        payload: {
          adminRoleList: data,
        },
      });
    },
    *cancelRoleFromAdmin({ payload }, { call, put }) {
      const res = yield call(cancelRoleFromAdminReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *addRoleFromAdmin({ payload }, { call, put }) {
      const res = yield call(addRoleFromAdminReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('添加成功');
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
          adminPage: page,
          adminPageSize: pageSize,
        },
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};
