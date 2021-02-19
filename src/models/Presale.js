import {
  getAllPresalesReq,
  postCreatePresaleReq,
  putModifyPresaleReq,
  deletePresaleReq,
  putOnshelvesPresaleReq,
  putOffshelvesPresaleReq,
} from '@/service/Presale.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'presale';
const model = {
  namespace,
  state: {
    presaleList: [
      {
        id: 0,
        name: 'string',
        BeginTime: 'string',
        payTime: 'string',
        endTime: 'string',
        goodsSku: {
          id: 0,
          name: 'string',
          skuSn: 'string',
          imageUrl: 'string',
          inventory: 0,
          originalPrice: 0,
          price: 0,
          disable: false,
        },
        shop: {
          id: 0,
          name: 'string',
        },
        state: '1',
        quantity: 0,
        advancePayPrice: 0,
        restPayPrice: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    presaleTotal: 0,
    presalePage: 1,
    presalePageSize: 10,
  },
  effects: {
    *getAllPresales({ payload }, { call, put }) {
      const res = yield call(getAllPresalesReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            presaleTotal: total,
            presaleList: list,
          },
        });
      }
    },
    *postCreatePresale({ payload }, { call, put }) {
      const res = yield call(postCreatePresaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *putModifyPresale({ payload }, { call, put }) {
      const res = yield call(putModifyPresaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *deletePresale({ payload }, { call, put }) {
      const res = yield call(deletePresaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putOnshelvesPresale({ payload }, { call, put }) {
      const res = yield call(putOnshelvesPresaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelvesPresale({ payload }, { call, put }) {
      const res = yield call(putOffshelvesPresaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          presalePage: page,
          presalePageSize: pageSize,
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

export const mapStateToProps = defaultMapStateToProps(model);
export const mapDispatchToProps = defaultMapDispatchToProps(model);
export default model;
