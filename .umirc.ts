import { defineConfig } from 'umi';
import { qiankun } from './src/app';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  dva: {
    immer: true,
    hmr: false,
  },
  // publicPath: process.env.NODE_ENV === 'production' ? 'http://oomall.finetoo.top/' : '/',
  proxy: {
    '/api': {
      target: 'http://localhost:8080/privilege/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  devServer: {
    port: 8001,
  },
  qiankun: {
    slave: {},
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
