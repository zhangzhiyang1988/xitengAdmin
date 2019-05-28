import React from 'react';
import ListTable from '../../components/Common/ListTable';
import OrderItemView from '../../components/OrderView/OrderItemView';
import ExportJsonExcel from 'js-export-excel';
import { connect } from 'dva';
import { Button } from 'antd';
/**
 * table 标题
 * @type
 */
const title = [
  '订单时间',
  '平台订单号',
  '支付订单号',
  '参与用户',
  '是否中签',
  '未中签是否直接购买',
  '商品代码',
  '期数',
  '商品名称',
  '市场价（元）',
  '销售价（元）',
  '抢购份数（份）',
  '抢购号码',
  '参与方式',
  '拼单状态',
  '拼单详情',
  '金额（元）',
  '喜币抵用（元）',
  '钱包支付',
  '运费',
  '实付金额（元）',
  '支付方式',
  '收货人',
  '电话',
  '收货地址',
  '退款路径',
  '订单状态',
];

/***
 * 数据配置
 * @type
 */
const dataIndex = [
  'orderTime',
  'orderNo',
  'payOrderNo',
  'phoneNum',
  'winStatus',
  'directBuy',
  'productNo',
  'gameStage',
  'productName',
  'productPrice',
  'oneDiscountPrice',
  'buyMount',
  'purchaseCode',
  'participateType',
  'groupStatus',
  'groupInfo',
  'totlePrice',
  'xtbMount',
  'rmbInAccount',
  'deliveryMount',
  'actualPayMount',
  'payType',
  'receiverName',
  'receiverPhoneNum',
  'receiveAddress',
  'refundWay',
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
    title: '是否中签',
    span: 5,
    keyIndex: 'winStatus',
    type: 'selector',
    options: ['中签', '未中签'],
  },
  {
    title: '参与方式',
    span: 5,
    keyIndex: 'participateType',
    type: 'selector',
    options: ['发起拼单', '单独购买', '参与拼单'],
  },
  {
    title: '未中签是否直接购买',
    span: 8,
    keyIndex: 'directBuy',
    type: 'selector',
    options: ['是', '否'],
  },
  {
    title: '退款路径',
    span: 5,
    keyIndex: 'refundWay',
    type: 'selector',
    options: ['原路退回', '喜腾账户'],
  },
];

const statusConfig = ['全部', '待付款', '待揭晓', '待晒单', '退款中', '已退款', '已揭晓', '已完成'];

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
    console.log('click confirm', record.id);
    this.props.dispatch({
      type: 'order/confirmSend',
      payload: { id: record.id, orderType: 'oneDiscountGameOrder' },
    });
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    // 数据结构处理

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
          orderType={'oneDiscountGameOrder'}
        />
        <Button onClick={this.downloadExcel}> 导出excel表格 </Button>
      </div>
    );
  }

  downloadExcel = () => {
    // currentPro 是列表数据
    const { store } = this.props;
    console.log('打印数据------' + JSON.stringify(store));
    var option = {};
    let dataTable = [];
    store.list.forEach(data => {
      let obj = {
        订单时间: data.orderTime,
        平台订单号: data.orderNo,
        支付订单号: data.payOrderNo,
        参与用户: data.phoneNum,
        是否中签: data.winStatus,
        未中签是否直接购买: data.directBuy,
        商品代码: data.productNo,
        期数: data.gameStage,
        商品名称: data.productName,
        '销售价（元）': data.productPrice,
        '抢购份数（份）': data.buyMount,
        抢购号码: data.purchaseCode,
        参与方式: data.participateType,
        拼单状态: data.groupStatus,
        拼单详情: data.groupInfo,
        '金额（元）': data.totlePrice,
        '喜币抵用（元）': data.xtbMount,
        钱包支付: data.rmbInAccount,
        运费: data.deliveryMount,
        '实付金额（元）': data.actualPayMount,
        支付方式: data.payType,
        收货人: data.receiverName,
        电话: data.receiverPhoneNum,
        收货地址: data.receiveAddress,
        退款路径: data.refundWay,
        订单状态: data.orderStatus,
      };
      dataTable.push(obj);
    });
    option.fileName = '全部订单';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetHeader: [
          '订单时间',
          '平台订单号',
          '支付订单号',
          '参与用户',
          '是否中签',
          '未中签是否直接购买',
          '商品代码',
          '期数',
          '商品名称',
          '销售价（元）',
          '抢购份数（份）',
          '抢购号码',
          '参与方式',
          '拼单状态',
          '拼单详情',
          '金额（元）',
          '喜币抵用（元）',
          '钱包支付',
          '运费',
          '实付金额（元）',
          '支付方式',
          '收货人',
          '电话',
          '收货地址',
          '退款路径',
          '订单状态',
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel();
  };
}
