/**
 * Created by LDQ on 2019-05-29
 */
import React from 'react';
import { connect } from 'dva';
import ListTable from '../../components/Common/ListTable';
import { Button, Popconfirm } from 'antd';

const title = [
  '订单ID',
  '退款总金额',
  '用户名',
  '电话号码',
  '订单创建时间',
  '自动退款时间',
  '订单来源',
  '自动退款结果',
];

const dataIndex = [
  'autoRefundOrderId',
  'autoRefundMount',
  'userName',
  'phoneNum',
  'createTime',
  'autoRefundTime',
  'source',
  'autoRefundFinish',
];

const conditionConfig = [
  { title: '退款单创建时间', span: 8, keyIndex: 'createTimePeriod', type: 'piker', options: null },
  {
    title: '处理状态',
    span: 5,
    keyIndex: 'autoRefundFinish',
    type: 'selector',
    options: [
      { title: '全部', key: '' },
      { title: '未处理', key: false },
      { title: '处理', key: true },
    ],
  },
];

const childTitle = [
  '支付单号',
  '退款单号',
  '退款金额',
  '付款金额',
  '付款方式',
  '是否成功',
  '退款码',
  '退款信息',
];

const childDateIndex = [
  'payOrderNo',
  'refundOrderNo',
  'refundMount',
  'totalPrice',
  'payChannel',
  'refundSuccess',
  'refundCode',
  'refundMsg',
];


const fetchUrl = 'finance/fetchAutoRefundOrderList';
@connect(({ finance, loading }) => ({
  store: finance,
  loading: loading.effects[fetchUrl],
}))
export default class AutoRefundOrderList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  showItem(record) {
    const childListConfig = {titleArray:childTitle,dataIndexArray:childDateIndex};

    // let props = Object.assign({},this.props,{store:record.autoRefundOrderItemModel});
    // console.log("props++++",props)
    return <ListTable
      {...{store:record.autoRefundOrderItemModel}}
      actionComponent={null}
      listConfig={childListConfig}
      columnWidth={200}
      />;
  }
  checkAutoRefundOrder(id,result) {
    console.log('confirmOk:id' + id);
    this.props.dispatch({
      type: 'finance/checkAutoRefundOrder',
      payload: {
        autoRefundOrderId: id,
        checkStatus : result,
      },
    });
  }

  getActionComponent(record) {

    return {
      title: '操作',
      render: (text, record) => {
        {
          console.log("recordrecordrecord",record);
          if(record.autoRefundFinish !== "未处理"){
            return null;
          }
          return (
            <div>
              <Popconfirm
                title={'同意'}
                key={record.key + 'ok'}
                onConfirm={() => this.checkAutoRefundOrder(record.autoRefundOrderId,"pass")}
              >
                <Button
                  type="primary"
                  className="confirm"
                  style={{ border: 0, marginRight: 10, backgroundColor: 'limegreen' }}
                >
                  同意
                </Button>
              </Popconfirm>
              <Button
                type="primary"
                className="confirm"
                style={{ border: 0, backgroundColor: 'red' }}
                onClick={() => this.checkAutoRefundOrder(record.autoRefundOrderId,"reject")}
              >
                拒绝
              </Button>
            </div>
          );
        }
      },
    };
  }
  render() {
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return (
      <div>
        <ListTable
          {...this.props}
          fetchUrl={fetchUrl}
          actionComponent={this.getActionComponent.bind(this)}
          listConfig={listConfig}
          conditionConfig={conditionConfig}
          columnWidth={150}
          showItem={this.showItem.bind(this)}
        />
      </div>
    );
  }
}
