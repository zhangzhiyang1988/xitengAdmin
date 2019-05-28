import { getOrderList, confirmSend } from '../services/api';

export default {
  namespace: 'analysis',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('获取会员人数111111111');
      const response = yield call(getOrderList, payload);
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
      };
    },
  },
};
