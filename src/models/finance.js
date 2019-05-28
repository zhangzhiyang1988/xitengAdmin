import {
  getRefundOrderList,
  getWidthDrawOrderList,
  confirmWithDrawOk,
  confirmWithDrawFail,
} from '../services/api';
export default {
  namespace: 'finance',
  state: {
    list: [],
    pageSize: 16,
    totalCount: 100,
    pageNo: 0,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getRefundOrderList, payload);
      console.log('退款订单----' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWithdrawOrderList({ payload }, { call, put }) {
      const response = yield call(getWidthDrawOrderList, payload);
      console.log('提现报表----' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWithdrawOrderTodoList({ payload }, { call, put }) {
      const msg = {
        ...payload,
        status: '待审核',
      };
      const response = yield call(getWidthDrawOrderList, msg);
      console.log('待审核----' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *confirmOk({ payload }, { call, put, select }) {
      const pageNo = yield select(state => state.finance.pageNo);
      yield call(confirmWithDrawOk, payload);

      const response = yield call(getWidthDrawOrderList, {
        pageNo: pageNo,
        pageSize: 16,
        status: '待审核',
      });
      console.log('提现报表确认后----' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *confirmFail({ payload }, { call, put, select }) {
      console.log('confirm withdraw fail...');
      const pageNo = yield select(state => state.finance.pageNo);

      yield call(confirmWithDrawFail, payload);
      const response = yield call(getWidthDrawOrderList, {
        pageNo: pageNo,
        pageSize: 16,
        status: '待审核',
      });
      console.log('提现报表拒绝后----' + JSON.stringify(response));

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
        pageNo: payload.pageNo,
      };
    },
  },
};
