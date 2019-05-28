import { getGameList } from '../services/api';

export default {
  namespace: 'game',
  state: {
    list: [],
    pageSize: 10,
    totalCount: 100,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getGameList, payload);
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
