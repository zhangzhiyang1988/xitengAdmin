import {
  confirmWithDrawFail,
  confirmWithDrawOk,
  checkAutoRefundOrder,
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
        payload: autoRefundOrder.changeFinanceReducersListLanguage().convertModelListToModel().changeAutoRefundOrderItemModelLanguage().getAutoRefundResponse(),
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
    *checkAutoRefundOrder({ payload }, { call, put, select }){
      const pageNo = yield select(state => state.finance.pageNo);
      yield call(checkAutoRefundOrder, payload);
      // console.log({payload})
      const response = yield call(getAutoRefundOrderList, {
        pageNo: pageNo,
        pageSize: 16,
      });
      console.log('原路退回----' + JSON.stringify(response));
      let autoRefundOrder = new AutoRefundOrder(response);
      yield put({
        type: 'save',
        payload: autoRefundOrder.changeFinanceReducersListLanguage().convertModelListToModel().changeAutoRefundOrderItemModelLanguage().getAutoRefundResponse(),
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
  }

  /**
   * 将自动提现中的部分字段的英文转换成对应中文 list
   * @returns {AutoRefundOrder}
   */
  changeFinanceReducersListLanguage(){
    let list = this.autoRefundResponse.list;
    let autoRefundResponseList = [];
    let dataIndex = {
      source:["withDraw","order"],
      autoRefundFinish:[false,true],
      autoRefundOrderStatus:["wait_check","wait_refund","reject","refund_finish"]
    };
    let valueRule = {
      source:["手动提现","订单"],
      autoRefundFinish:["未处理","处理"],
      autoRefundOrderStatus:["待审核","待退款","拒绝","退款完成"]
    };
    let languageBox = new LanguageBox(valueRule,dataIndex);
    for(let i = 0;i < list.length;i++){
      let translateItem = languageBox.translate(list[i]);
      autoRefundResponseList.push(translateItem);
    }
    this.autoRefundResponse.list = autoRefundResponseList;
    return this;
  }
  convertModelListToModel(){
    for(let i = 0;i < this.autoRefundResponse.list.length;i++ ){
      this.autoRefundResponse.list[i].autoRefundOrderItemModel = {
        list: this.autoRefundResponse.list[i].autoRefundOrderItemModelList,
        totalCount: this.autoRefundResponse.list[i].autoRefundOrderItemModelList.length,
        page: 1
      };
      for(let j = 0;j < this.autoRefundResponse.list[i].autoRefundOrderItemModel.list.length;j++){
        this.autoRefundResponse.list[i].autoRefundOrderItemModel.list[j].refundMount = this.autoRefundResponse.list[i].autoRefundOrderItemModel.list[j].refundMount/100;
        this.autoRefundResponse.list[i].autoRefundOrderItemModel.list[j].totalPrice = this.autoRefundResponse.list[i].autoRefundOrderItemModel.list[j].totalPrice/100;
      }
      this.autoRefundResponse.list[i].autoRefundMount = this.autoRefundResponse.list[i].autoRefundMount/100;
    }
    return this;
  }
  changeAutoRefundOrderItemModelLanguage(){
    let dataIndex = {
      payChannel:["WeixinMiniProgramPay","order"],
      refundSuccess:[false,true,null]
    };
    let valueRule = {
      payChannel:["小程序付款","订单"],
      refundSuccess:["失败","成功","未处理"]
    };
    let languageBox = new LanguageBox(valueRule,dataIndex);
    for(let i = 0 ;i < this.autoRefundResponse.list.length;i++){
      let list = this.autoRefundResponse.list[i].autoRefundOrderItemModel.list;
      for(let j = 0;j < list.length;j++){
        languageBox.translate(list[j])
      }
    }
    return this;
  }

  getAutoRefundResponse(){
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
