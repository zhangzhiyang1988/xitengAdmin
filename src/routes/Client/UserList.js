import React from 'react';
import { connect } from 'dva';
import { ItemFormView } from '../../components/Common/ItemFormView';
import ListTable from '../../components/Common/ListTable';

/**
 * table 标题
 * @type
 */
const title = [
  '注册时间',
  '手机号',
  '用户名',
  '喜腾号',
  '账户编号',
  '账户喜币',
  '账户人民币总额',
  '账户可提现人民币',
];

const dataIndex = [
  'registTime',
  'phoneNum',
  'nickName',
  'xitengCode',
  'accountId',
  'restXtb',
  'totalRmb',
  'canWithdrawRmb',
];
/**
 * 条件查询
 * @type
 */
const conditionConfig = [
  { title: '注册时间', span: 8, keyIndex: 'registPeriod', type: 'piker', options: null },
  { title: '用户名', span: 5, keyIndex: 'phoneNum', type: 'input', options: null },
  { title: '账户ID', span: 5, keyIndex: 'accountId', type: 'input', options: null },
  { title: '喜腾号', span: 5, keyIndex: 'xitengCode', type: 'input', options: null },
];

const showItemConfig = [
  { title: '注册时间', key: 'registTime', type: 'show' },
  { title: '手机号', key: 'phoneNum', type: 'show' },
  { title: '喜腾号', key: 'xitengCode', type: 'show' },
  { title: '账户编号', key: 'accountId', type: 'show' },
  { title: '账户喜币', key: 'restXtb', type: 'show' },
  { title: '账户人民币总额', key: 'totalRmb', type: 'show' },
  { title: '账户可提现人民币', key: 'canWithdrawRmb', type: 'show' },
];

const fetchUrl = 'client/fetchUserList';

@connect(({ client, loading }) => ({
  store: client,
  loading: loading.effects[fetchUrl],
}))
export default class UserList extends React.Component {
  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return <ItemFormView data={record} title="用户信息" config={showItemConfig} />;
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
          // statusConfig={statusConfig}
        />
      </div>
    );
  }
}
