import { history, RequestConfig } from 'umi';
import { addAuth2Header } from './utilReq/requestInterceptor';
import { handleErrorMsg } from './utilReq/responseInterceptor';
import { message } from 'antd';
import { errorHandler } from './utilReq/errorHandler';
import { getUserReq } from '@/service/personal/User';
import { nologRoutes, BASEURL } from '@/const/router';
// import 'antd/dist/antd.css';
console.log(process.env.NODE_ENV);

export function render(oldRender: () => void) {
  oldRender();
}

export const request: RequestConfig = {
  timeout: 5000,
  mode: 'cors',
  prefix: process.env.NODE_ENV == 'production' ? BASEURL : '/api',
  errorHandler,
  errorConfig: {
    adaptor: resData => {
      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
  requestInterceptors: [
    // addBaseUrl,
    addAuth2Header,
  ],
  responseInterceptors: [handleErrorMsg],
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('privilege bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('privilege mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('privilege unmount', props);
  },
};
