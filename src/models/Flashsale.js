import {
  getAllFlashsalesSegmentsReq,
  getAllFlashsalesReq,
  postCreateFlashsaleReq,
  deleteFlashsaleByIdReq,
  deleteFlashsaleSkuByIdReq,
  postAddSkuFlashsaleReq,
  putModifyFlashsaleReq,
  putOnshelvesFlashsaleReq,
  putOffshelvesFlashsaleReq,
} from '@/service/Flashsale.tsx';
import {
  defaultMapStateToProps,
  defaultMapDispatchToProps,
} from '@/utils/reduxUtil.tsx';
import { isErrnoEqual0, isCodeEqualOk } from '@/utils/validate';
import { message } from 'antd';
const namespace = 'flashsale';
const model = {
  namespace,
  state: {
    flashsaleList: [
      {
        id: 0,
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
        price: 0,
        quantity: 0,
        gmtCreate: 'string',
        gmtModified: 'string',
      },
    ],
    flashsaleTotal: 0,
    flashsalePage: 1,
    flashsalePageSize: 10,
    flashsaleSkuList: [], // 没有这个接口
  },
  effects: {
    *getAllFlashsalesSegments({ payload }, { call, put }) {
      const res = yield call(getAllFlashsalesSegmentsReq, payload);
    },
    *deleteFlashsaleSkuById({ payload }, { call, put }) {
      const res = yield call(deleteFlashsaleSkuByIdReq, payload);
    },
    *postAddSkuFlashsale({ payload }, { call, put }) {
      const res = yield call(postAddSkuFlashsaleReq, payload);
    },
    *getAllFlashsales({ payload }, { call, put }) {
      const res = yield call(getAllFlashsalesReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        const { data } = res;
        const { list, total } = data;
        yield put({
          type: 'save',
          payload: {
            flashsaleList: list,
            flashsaleTotal: total,
          },
        });
      }
    },
    *postCreateFlashsale({ payload }, { call, put }) {
      const res = yield call(postCreateFlashsaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('创建成功');
      }
    },
    *deleteFlashsaleById({ payload }, { call, put }) {
      const res = yield call(deleteFlashsaleByIdReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('删除成功');
      }
    },
    *putModifyFlashsale({ payload }, { call, put }) {
      const res = yield call(putModifyFlashsaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('修改成功');
      }
    },
    *putOnshelvesFlashsale({ payload }, { call, put }) {
      const res = yield call(putOnshelvesFlashsaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('上架成功');
      }
    },
    *putOffshelvesFlashsale({ payload }, { call, put }) {
      const res = yield call(putOffshelvesFlashsaleReq, payload);
      if (isErrnoEqual0(res) || isCodeEqualOk(res)) {
        message.success('下架成功');
      }
    },
    *savePagination({ payload }, { call, put }) {
      const { page, pageSize } = payload;
      yield put({
        type: 'save',
        payload: {
          flashsalePage: page,
          flashsalePageSize: pageSize,
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
