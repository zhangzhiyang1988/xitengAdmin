import {
  confirmWithDrawFail,
  confirmWithDrawOk,
  getAutoRefundOrderList,
  getRefundOrderList,
  getWidthDrawOrderList,
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
    *fetchAutoRefundOrderList({ payload }, { call, put }) {
      const response = yield call(getAutoRefundOrderList, payload);
      console.log('原路退回----' + JSON.stringify(response));
      let autoRefundOrder = new AutoRefundOrder(response);
      yield put({
        type: 'save',
        payload: autoRefundOrder.changeFinanceReducersListLanguage().getAutoRefundResponse(),
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



//  todo fetchAutoRefundOrderList 的返回值中list需要展开重组 如果想提到别的文件中就请移动
class AutoRefundOrder{
  constructor(autoRefundResponse){
    this.autoRefundResponse = Object.assign({},autoRefundResponse);
    let dataIndex = {
      source:["withDraw","overTime"],
      autoRefundFinish:[false,true]
    };
    let valueRule = {
      source:["手动提现","到期自动退款"],
      autoRefundFinish:["未完成","完成"]
    };
    this.languageBox = new LanguageBox(valueRule,dataIndex)

  }

  /**
   * 将自动提现中的部分字段的英文转换成对应中文 list
   * @returns {AutoRefundOrder}
   */
  changeFinanceReducersListLanguage(){
    let list = this.autoRefundResponse.list;
    let autoRefundResponseList = [];
    for(let i = 0;i < list.length;i++){
      let translateItem = this.languageBox.translate(list[i]);
      autoRefundResponseList.push(translateItem);
    }
    this.autoRefundResponse.list = autoRefundResponseList;
    return this;
  }
  getAutoRefundResponse(){
    console.log("========",this.autoRefundResponse);
    return this.autoRefundResponse;
  }

}


class LanguageBox{
  constructor(valueRule,dataIndex){
    this.valueRule = valueRule;
    this.dataIndex = dataIndex;
  }
  translate(transItem){
    for(let prop in this.dataIndex){
      let index = this.dataIndex[prop].findIndex(function(dataItem){
        return dataItem === transItem[prop];
      });
      transItem[prop] = this.valueRule[prop][index];
    }

    return transItem;

  }

}
