import { getOrderList, confirmSend } from '../services/api';

function convertToHasSendGoods(status) {
  if (status === null || status === undefined) {
    return null;
  }
  if (status === '未发货') {
    return false;
  } else if (status === '已发货') {
    return true;
  } else {
    return null;
  }
}
export default {
  namespace: 'order',
  state: {
    list: [],
    pageSize: 8,
    pageNo: 0,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getOrderList, payload);
      console.log('一折购商品----' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchWinOrderList({ payload }, { call, put }) {
      const winStatus = '中签';
      let hasSendGoods = convertToHasSendGoods(payload.status);
      if (hasSendGoods != null) {
        Object.assign(payload, { winStatus }, { hasSendGoods });
      } else {
        Object.assign(payload, { winStatus });
      }
      const response = yield call(getOrderList, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },

    *confirmSend({ payload }, { call, put }) {
      payload = { discountOrderId: payload.id, orderType: payload.orderType };
      /**
       * 确认发送
       */
      console.log('hjde' + JSON.stringify(payload));
      yield call(confirmSend, payload);

      //重新获取数据
      const response = yield call(getOrderList, {
        pageNo: 0,
        pageSize: 8,
        winStatus: '中签',
        orderType: payload.orderType,
      });
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
