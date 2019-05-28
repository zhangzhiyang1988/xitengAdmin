import React from 'react';
import { Button, Popconfirm } from 'antd';
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
  '商品代码',
  '期数',
  '商品名称',
  '销售价（元）',
  '抢购份数（份）',
  '抢购号码',
  '参与方式',
  '拼单状态',
  '拼单详情',
  '金额(元)',
  '喜币抵用(元)',
  '运费',
  '实付金额(元)',
  '支付方式',
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
  'phoneNum',
  'productNo',
  'gameStage',
  'productName',
  'productPrice',
  'buyMount',
  'purchaseCode',
  'participateType',
  'groupStatus',
  'discountGameGroupModel',
  'totlePrice',
  'xtbMount',
  'deliveryMount',
  'actualPayMount',
  'payType',
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
  {
    title: '参与方式',
    span: 5,
    keyIndex: 'participateType',
    type: 'selector',
    options: ['发起拼单', '单独购买', '参与拼单'],
  },
];

const statusConfig = ['全部', '未发货', '已发货'];

const fetchUrl = 'order/fetchWinOrderList';
@connect(({ order, loading }) => ({
  store: order,
  loading: loading.effects[fetchUrl],
}))
export default class WinOrderList extends React.Component {
  /**
   * 确认发货
   * @param record
   */
  confirmSend(orderId) {
    console.log('click confirm', orderId);
    this.props.dispatch({
      type: 'order/confirmSend',
      payload: { id: orderId, orderType: 'oneDiscountGameOrder' },
    });
  }

  /**
   * 注入操作按钮
   * @returns {{title: string, render: (function(*, *=))}}
   */
  getActionComponent() {
    return {
      title: '操作',
      render: (text, record) => {
        if (
          record.hasSendGoods !== null &&
          record.hasSendGoods !== undefined &&
          false === record.hasSendGoods
        ) {
          return (
            <Popconfirm
              title={'确认发货'}
              key={record.id}
              onConfirm={() => this.confirmSend(record.id)}
            >
              <Button type="primary" className="confirm">
                确认发货
              </Button>
            </Popconfirm>
          );
        } else {
          return <div style={{ width: 150 }}>已经完成</div>;
        }
      },
    };
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return <OrderItemView order={record} confirmSend={this.confirmSend.bind(this)} />;
  }

  render() {
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return (
      <div>
        <ListTable
          {...this.props}
          fetchUrl={fetchUrl}
          showItem={this.showItem.bind(this)}
          actionComponent={this.getActionComponent.bind(this)}
          conditionConfig={conditionConfig}
          listConfig={listConfig}
          statusConfig={statusConfig}
          columnWidth={150}
          orderType={'oneDiscountGameOrder'}
        />
      </div>
    );
  }
}
