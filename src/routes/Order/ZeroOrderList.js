import React from 'react';
import ListTable from '../../components/Common/ListTable';
import OrderItemView from '../../components/OrderView/OrderItemView';

import { connect } from 'dva';

/**
 * table 标题
 * @type
 */
const title = [
  '订单时间',
  '订单号',
  '参与用户',
  '商品模块',
  '商品代码',
  '商品名称',
  '期数',
  '单价（元）',
  '完成拼团（个）',
  '获得号码(个)',
  '参与方式',
  '收货人',
  '电话',
  '收货地址',
  '订单状态',
];

/***
 * 数据配置
 * @type
 */
const dataIndex = [
  'orderTime',
  'orderNo',
  'winUserPhone',
  'productInfo',
  'productNo',
  'productName',
  'gameStage',
  'oneDiscountPrice',
  'finishGroupCount',
  'luckyCodeCount',
  'participateType',
  'receiverName',
  'receiverPhoneNum',
  'receiveAddress',
  'orderStatus',
];
/**
 * 条件查询
 * @type
 */
const conditionConfig = [
  { title: '订单时间', span: 8, keyIndex: 'createTimePeriod', type: 'piker', options: null },
  { title: '订单号', span: 5, keyIndex: 'orderNo', type: 'input', options: null },
  { title: '商品分类', span: 5, keyIndex: 'productCategory', type: 'input', options: null },
  { title: '商品代码', span: 5, keyIndex: 'productCode', type: 'input', options: null },
  { title: '期数', span: 8, keyIndex: 'gameStage', type: 'input', options: null },
  { title: '参与用户', span: 5, keyIndex: 'phoneNum', type: 'input', options: null },
  { title: '是否中签', span: 5, keyIndex: 'isWin', type: 'selector', options: ['中签', '未中签'] },
  {
    title: '参与方式',
    span: 5,
    keyIndex: 'participateType',
    type: 'selector',
    options: ['发起拼单', '单独购买', '参与拼单'],
  },
];

const statusConfig = ['全部', '待付款', '待揭晓', '待晒单', '退款中', '已退款', '已完成'];

let fetchUrl = 'order/fetch';

@connect(({ order, loading }) => ({
  store: order,
  loading: loading.effects[fetchUrl],
}))

export default class OrderList extends React.Component {
  /**
   * 确认发货
   * @param record
   */
  confirmSend(record) {
    console.log('click confirm', record);
    this.props.dispatch({
      type: 'order/confirmSend',
      payload: { id: orderId,orderType:'zeroDiscountGameOrder' },
    });
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return (
      <OrderItemView
        order={record}
        confirmSend={record => {
          this.confirmSend(record);
        }}
      />
    );
  }

  render() {
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return (
      <div>
        <ListTable
          {...this.props}
          fetchUrl={fetchUrl}
          showItem={this.showItem.bind(this)}
          conditionConfig={conditionConfig}
          listConfig={listConfig}
          statusConfig={statusConfig}
          columnWidth={150}
          orderType={"zeroDiscountGameOrder"}
        />
      </div>
    );
  }
}
