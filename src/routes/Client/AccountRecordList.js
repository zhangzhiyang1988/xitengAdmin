import React from 'react';
import { connect } from 'dva';
import { ItemFormView } from '../../components/Common/ItemFormView';
import ListTable from '../../components/Common/ListTable';

/**
 * table 标题
 * @type
 */
const title = [
  '交易时间',
  '用户名',
  '手机号',
  '账户编号',
  '交易前喜币',
  '喜币变化',
  '喜币余额',
  '交易前人民币',
  '人民币变化',
  '人民币余额',
  '订单号',
  '交易描述',
];

const dataIndex = [
  'createTime',
  'nickName',
  'phoneNum',
  'accountId',
  'baseXtb',
  'deltaXtb',
  'resultXtb',
  'baseRmbInAccount',
  'deltaRmbInAccount',
  'resultRmbInAccount',
  'orderId',
  'operationType',
];

/**
 * 条件查询
 * @type
 */
const conditionConfig = [
  { title: '注册时间', span: 8, keyIndex: 'registPeriod', type: 'piker', options: null },
  { title: '用户名', span: 5, keyIndex: 'phoneNum', type: 'input', options: null },
  { title: '账户编号', span: 5, keyIndex: 'accountId', type: 'input', options: null },
  { title: '订单号', span: 5, keyIndex: 'orderId', type: 'input', options: null },
];

const showItemConfig = [
  { title: '交易时间', key: 'createTime', type: 'show' },
  { title: '用户名', key: 'nickName', type: 'show' },
  { title: '手机号', key: 'phoneNum', type: 'show' },
  { title: '账户编号', key: 'accountId', type: 'show' },
  { title: '喜币余额', key: 'resultXtb', type: 'show' },
  { title: '人民币余额', key: 'resultRmbInAccount', type: 'show' },
  { title: '订单号', key: 'orderId', type: 'show' },
  { title: '交易描述', key: 'operationType', type: 'show' },
];

const fetchUrl = 'client/fetchAccountRecordList';

@connect(({ client, loading }) => ({
  store: client,
  loading: loading.effects[fetchUrl],
}))
export default class AccountRecordList extends React.Component {
  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return <ItemFormView data={record} title="账户记录" config={showItemConfig} />;
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
          columnWidth={120}
        />
      </div>
    );
  }
}
