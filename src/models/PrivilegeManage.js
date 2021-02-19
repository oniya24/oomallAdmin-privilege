import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  getAllPrivilege,
  updatePrivilegeById,
} from '@/service/PrivilegeManage';
import { message } from 'antd';

export const mapStateToProps = ({ PrivilegeManage, loading }) => {
  const { priList, priPage, priPageSize, priTotal } = PrivilegeManage;
  return {
    priList,
    priPage,
    priTotal,
    priPageSize,
    getPriLoading: loading.effects['PrivilegeManage/getPriList'],
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getPriList: payload =>
      dispatch({ type: 'PrivilegeManage/getPriList', payload }),
    updatePriInfo: payload =>
      dispatch({ type: 'PrivilegeManage/updatePriInfo', payload }),
    savePagination: payload =>
      dispatch({ type: 'PrivilegeManage/savePagination', payload }),
  };
};

const PersonalModel = {
  namespace: 'PrivilegeManage',
  state: {
    priPage: 1,
    priPageSize: 10,
    priTotal: 0,
    priList: [
      {
        id: '1231',
        name: '查看任意用户信息',
        url: '/adminusers/{id}',
        requestType: 0,
        gmtCreate: '2020-11-01 09:52:20',
        gmtModified: '2020-11-01 09:52:20',
      },
      {
        id: '113231',
        name: '删除用户信息',
        url: '/adminusers/{id}',
        requestType: 3,
        gmtCreate: '2020-11-01 09:52:20',
        gmtModified: '2020-11-01 09:52:20',
      },
    ],
  },
  effects: {
    *getPriList({ payload }, { call, put }) {
      const { data } = yield call(getAllPrivilege, payload);
      const { list, page, total } = data;
      yield put({
        type: 'save',
        payload: {
          priList: list,
          priTotal: total,
        },
      });
    },
    *updatePriInfo({ payload }, { call, put }) {
      const res = yield call(updatePrivilegeById, payload);
      yield put({
        type: 'getPriList',
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
          priPage: page,
          priPageSize: pageSize,
        },
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default PersonalModel;
