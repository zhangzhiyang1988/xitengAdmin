import React from 'react';
import { connect } from 'dva';
import ListTable from '../../components/Common/ListTable';
import ItemView from '../../components/Common/ItemFormView';

const title = [
  '提现时间',
  '交易单号',
  '用户名',
  '手机号',
  '提现金额(元)',
  '账户余额(元)',
  '持卡人',
  '银行卡号',
  '银行名称',
  '开户支行',
  '状态',
  '操作人',
  '备注',
];

const dataIndex = [
  'widthDrawTime',
  'orderNo',
  'userName',
  'phoneNum',
  'withDrawMount',
  'rmbBalance',
  'cardOwner',
  'bankCardNo',
  'bankName',
  'branchBank',
  'status',
  'operator',
  'backlog',
];

const itemConfig = [
  { title: '提取时间', key: 'widthDrawTime', type: 'show' },
  { title: '交易号', key: 'orderNo', type: 'show' },
  { title: '用户名', key: 'userName', type: 'show' },
  { title: '手机号', key: 'phoneNum', type: 'show' },
  { title: '提现金额(元)', key: 'withDrawMount', type: 'show' },
  { title: '持卡人', key: 'cardOwner', type: 'show' },
  { title: '银行卡号', key: 'bankCardNo', type: 'show' },
  { title: '银行名称', key: 'bankName', type: 'show' },
  { title: '开户支行', key: 'branchBank', type: 'show' },
  { title: '状态', key: 'status', type: 'show' },
  { title: '操作人', key: 'operator', type: 'show' },
  { title: '备注', key: 'backlog', type: 'show' },
];

const conditionConfig = [
  { title: '提取时间', span: 8, keyIndex: 'widthDrawTimePeriod', type: 'piker', options: null },
  { title: '交易单号', span: 5, keyIndex: 'orderNo', type: 'input', options: null },
  { title: '用户名', span: 5, keyIndex: 'userName', type: 'input', options: null },
  { title: '手机号', span: 5, keyIndex: 'phoneNum', type: 'input', options: null },
  { title: '银行名称', span: 8, keyIndex: 'bankName', type: 'input', options: null },
  { title: '银行卡号', span: 5, keyIndex: 'bankCardNo', type: 'input', options: null },
];

const statusConfig = ['全部', '待处理', '已通过', '已拒绝'];

const fetchUrl = 'finance/fetchWithdrawOrderList';

@connect(({ finance, loading }) => ({
  store: finance,
  loading: loading.effects[fetchUrl],
}))
export default class WithDrawOrderList extends React.Component {
  constructor() {
    super();
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return <ItemView data={record} config={itemConfig} title="提现详情" />;
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
