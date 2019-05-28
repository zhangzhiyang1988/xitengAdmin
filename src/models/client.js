import { getUserList, getAccountRecordList } from '../services/api';

export default {
  namespace: 'client',
  state: {
    list: [],
    pageSize: 8,
    pageNo: 0,
  },
  effects: {
    *fetchUserList({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchAccountRecordList({ payload }, { call, put }) {
      const response = yield call(getAccountRecordList, payload);
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
