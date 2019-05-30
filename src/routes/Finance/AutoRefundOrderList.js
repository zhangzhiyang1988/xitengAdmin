/**
 * Created by LDQ on 2019-05-29
 */
import React from 'react';
import { connect } from 'dva';
import ListTable from '../../components/Common/ListTable';
import ItemView from '../../components/Common/ItemFormView';

const title = [
  '退款总金额',
  '用户名',
  '电话号码',
  '订单创建时间',
  '自动退款时间',
  '订单来源',
  '自动退款结果',
];

const dataIndex = [
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
    title: '退款状态',
    span: 5,
    keyIndex: 'autoRefundFinish',
    type: 'selector',
    options: [
      { title: '全部', key: '' },
      { title: '未完成', key: false },
      { title: '完成', key: true },
    ],
  },
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

  render() {
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return (
      <div>
        <ListTable
          {...this.props}
          fetchUrl={fetchUrl}
          actionComponent={null}
          listConfig={listConfig}
          conditionConfig={conditionConfig}
          columnWidth={150}
          showItem={null}
        />
      </div>
    );
  }
}
