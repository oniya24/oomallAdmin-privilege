import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  updateUserReq,
  getUserReq,
  sendAuthCodeReq,
  updatePasswordReq,
} from '@/service/personal/User';
import { message } from 'antd';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';

export const mapStateToProps = ({ User, loading }) => {
  const { userInfo } = User;
  return {
    userInfo,
    getUserLoading: loading.effects.getUser,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateUser: payload => dispatch({ type: 'User/updateUser', payload }),
    getUser: payload => dispatch({ type: 'User/getUser', payload }),
    sendAuthCode: payload => dispatch({ type: 'User/sendAuthCode', payload }),
    updatePassword: payload =>
      dispatch({ type: 'User/updatePassword', payload }),
  };
};

const PersonalModel = {
  namespace: 'User',
  state: {
    userInfo: {
      userName: '1',
      mobile: '2',
      name: '3',
      email: '4',
      avatar: '5',
      lastLoginTime: '6',
      lastLoginIp: '7',
    },
  },
  effects: {
    *updateUser({ payload }, { call, put }) {
      const res = yield call(updateUserReq, payload);
      if (isErrnoEqual0(res)) {
        message.success('修改成功');
        yield put({
          type: 'getUser',
        });
      }
    },
    *getUser({ payload }, { call, put }) {
      const res = yield call(getUserReq, payload);
      if (isErrnoEqual0(res)) {
        const { data } = res;
        yield put({
          type: 'save',
          payload: data,
        });
        sessionStorage.setItem('adminInfo', JSON.stringify(data));
      }
    },
    *sendAuthCode({ payload }, { call, put }) {
      const res = yield call(sendAuthCodeReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        message.success(`发送成功, 验证码为${data}`);
      }
    },
    *updatePassword({ payload }, { call, put }) {
      const res = yield call(updatePasswordReq, payload);
      message.success('修改成功');
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        userInfo: action.payload,
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

export default PersonalModel;
