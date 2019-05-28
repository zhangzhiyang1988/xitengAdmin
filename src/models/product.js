import {getProductList, uploadToServer} from '../services/api';

export default {
  namespace: 'product',
  state: {
    list: [],
    pageSize: 10,
    totalCount: 100,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getProductList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        list: payload.list,
        pageSize: payload.pageSize,
        totalCount: payload.totalCount,
      };
    },
  },
};
