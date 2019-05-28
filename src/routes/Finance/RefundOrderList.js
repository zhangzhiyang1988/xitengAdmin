import React from 'react';
import { connect } from 'dva';
import ListTable from '../../components/Common/ListTable';
import ItemView from '../../components/Common/ItemFormView';

const title = [
  '退款时间',
  '平台订单号',
  '支付订单号',
  '退款单号',
  '用户',
  '中签状态',
  '商品代码',
  '商品名称',
  '期数',
  '一折价(元)',
  '购买份数',
  '喜币抵用',
  '实付金额',
  '支付方式',
  '应退喜币',
  '应退金额',
  '退款状态',
  '退款到账时间',
];

const dataIndex = [
  'refundTime',
  'platformOrderNo',
  'payOrderNo',
  'refundOrderNo',
  'phoneNum',
  'winStatus',
  'productCode',
  'productName',
  'gameStage',
  'oneDiscountPrice',
  'buyMount',
  'payXtbMount',
  'totalPayRmb',
  'payChannel',
  'refundXtb',
  'refundRmb',
  'refundStatus',
  'receiveTime',
];

const conditionConfig = [
  { title: '退款时间', span: 8, keyIndex: 'createTimePeriod', type: 'piker', options: null },
  { title: '一折购订单号', span: 5, keyIndex: 'orderNo', type: 'input', options: null },
  { title: '退款订单号', span: 5, keyIndex: 'refundOrderId', type: 'input', options: null },
  { title: '商品代码', span: 5, keyIndex: 'productCode', type: 'input', options: null },
  { title: '期数', span: 8, keyIndex: 'gameStage', type: 'input', options: null },
  { title: '用户', span: 5, keyIndex: 'phoneNum', type: 'input', options: null },
  {
    title: '中签状态',
    span: 5,
    keyIndex: 'winStatus',
    type: 'selector',
    options: ['中签', '未中签'],
  },
];

const itemConfig = [
  { title: '退款时间', key: 'refundTime', type: 'show' },
  { title: '一折购订单号', key: 'platformOrderNo', type: 'show' },
  { title: '退款单号', key: 'refundOrderNo', type: 'show' },
  { title: '用户', key: 'phoneNum', type: 'show' },
  { title: '中签状态', key: 'winStatus', type: 'show' },
  { title: '商品代码', key: 'productCode', type: 'show' },
  { title: '商品名称', key: 'productName', type: 'show' },
  { title: '期数', key: 'gameStage', type: 'show' },
  { title: '应退喜币', key: 'refundXtb', type: 'show' },
  { title: '应退金额', key: 'refundRmb', type: 'show' },
];

const statusConfig = ['全部', '退款中', '退款完成'];

const fetchUrl = 'finance/fetch';

@connect(({ finance, loading }) => ({
  store: finance,
  loading: loading.effects[fetchUrl],
}))
export default class RefundOrderList extends React.Component {
  constructor() {
    super();
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return <ItemView data={record} config={itemConfig} title="订单详情" />;
  }

  render() {
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return (
      <div>
        <ListTable
          {...this.props}
          fetchUrl={fetchUrl}
          showItem={this.showItem.bind(this)}
          actionComponent={null}
          conditionConfig={conditionConfig}
          listConfig={listConfig}
          statusConfig={statusConfig}
          columnWidth={150}
        />
      </div>
    );
  }
}
