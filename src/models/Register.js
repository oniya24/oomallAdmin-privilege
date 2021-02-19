import {
  Effect,
  ImmerReducer,
  Reducer,
  Subscription,
  history,
  dispatch,
} from 'umi';
import { registerAdmin } from '@/service/Register';
import { message } from 'antd';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';

const namespace = 'register';
export const mapStateToProps = props => {
  const { Login, loading } = props;
  return {
    // loginLoading: loading.effects['Login/login']
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    registerAdmin: payload =>
      dispatch({ type: `${namespace}/registerAdmin`, payload }),
  };
};

export default {
  namespace: namespace,
  state: {
    // name: '123456',
  },
  effects: {
    *registerAdmin({ payload }, { call, put }) {
      const res = yield call(registerAdmin, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('注册成功，等待审核');
      }
    },
  },
  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
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
