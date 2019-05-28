import React from 'react';
import { connect } from 'dva';
import { Popconfirm, Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;
import ListTable from '../../components/Common/ListTable';
import ItemView from '../../components/Common/ItemFormView';
import CreateForm from '../../components/Common/CreateForm';
import ExportJsonExcel from 'js-export-excel';
const title = [
  '提取时间',
  '交易号',
  '用户名',
  '手机号',
  '账户余额',
  '提现金额(元)',
  '持卡人',
  '银行卡号',
  '银行名称',
  '开户支行',
  '审核时间',
];

const dataIndex = [
  'widthDrawTime',
  'orderNo',
  'userName',
  'phoneNum',
  'rmbBalance',
  'withDrawMount',
  'cardOwner',
  'bankCardNo',
  'bankName',
  'branchBank',
  'confirmTime',
];

const itemConfig = [
  { title: '提取时间', key: 'widthDrawTime', type: 'show' },
  { title: '交易号', key: 'orderNo', type: 'show' },
  { title: '用户名', key: 'userName', type: 'show' },
  { title: '手机号', key: 'phoneNum', type: 'show' },
  { title: '账户余额(元)', key: '账户余额', type: 'show' },
  { title: '提现金额(元)', key: 'withDrawMount', type: 'show' },
  { title: '持卡人', key: 'cardOwner', type: 'show' },
  { title: '银行卡号', key: 'bankCardNo', type: 'show' },
  { title: '银行名称', key: 'bankName', type: 'show' },
  { title: '开户支行', key: 'branchBank', type: 'show' },
  { title: '状态', key: 'status', type: 'show' },
  { title: '审核时间', key: 'confirmTime', type: 'show' },
];

const conditionConfig = [
  { title: '提取时间', span: 8, keyIndex: 'widthDrawTimePeriod', type: 'piker', options: null },
  { title: '交易单号', span: 5, keyIndex: 'orderNo', type: 'input', options: null },
  { title: '用户名', span: 5, keyIndex: 'userName', type: 'input', options: null },
  { title: '手机号', span: 5, keyIndex: 'phoneNum', type: 'input', options: null },
  { title: '银行名称', span: 8, keyIndex: 'bankName', type: 'input', options: null },
  { title: '银行卡号', span: 5, keyIndex: 'bankCardNo', type: 'input', options: null },
];

const fetchUrl = 'finance/fetchWithdrawOrderTodoList';

const createItemConfig = [
  {
    title: ['账户姓名和银行开户姓名不符', '银行账号信息有误或状态异常', '暂不支持该类银行账户'],
    key: 'errorType',
    type: 'selected',
  },
  { title: '备注', key: 'backlog', type: 'text' },
];

@connect(({ finance, loading }) => ({
  store: finance,
  loading: loading.effects[fetchUrl],
}))
export default class WithDrawOrderTodoList extends React.Component {
  constructor() {
    super();
    this.state = { visible: false, id: 0 };
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return <ItemView data={record} config={itemConfig} title="提现详情" />;
  }

  onCreate(recordId) {
    this.setState({ visible: true, id: recordId });
  }

  /**
   * 注入操作按钮
   * @returns {{title: string, render: (function(*, *=))}}
   */
  getActionComponent() {
    return {
      title: '操作',
      render: (text, record) => {
        {
          return (
            <div>
              <Popconfirm
                title={'同意'}
                key={record.key + 'ok'}
                onConfirm={() => this.confirmOk(record.id)}
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
                onClick={() => this.onCreate(record.id)}
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
          showItem={this.showItem.bind(this)}
          actionComponent={this.getActionComponent.bind(this)}
          conditionConfig={conditionConfig}
          listConfig={listConfig}
          columnWidth={150}
        />
        <Button onClick={this.downloadExcel}> 导出excel表格 </Button>
        <CreateForm
          title="填写驳回信息"
          config={createItemConfig}
          modalVisible={this.state.visible}
          submit={values => {
            this.confirmFail(this.state.id, values);
          }}
          handleModalVisible={() => {
            this.setState({ visible: false });
          }}
        />
      </div>
    );
  }

  confirmOk(id) {
    console.log('confirmOk:id' + id);
    this.props.dispatch({
      type: 'finance/confirmOk',
      payload: {
        id: id,
        operator: '财务',
      },
    });
  }

  confirmFail(id, values) {
    console.log('confirmFail:id' + id);
    this.props.dispatch({
      type: 'finance/confirmFail',
      payload: {
        id: id,
        operator: '财务',
        ...values,
      },
    });
  }

  downloadExcel = () => {
    // currentPro 是列表数据
    const { store } = this.props;
    var option = {};
    let dataTable = [];

    store.list.forEach(data => {
      let obj = {
        提取时间: data.widthDrawTime,
        交易号: data.orderNo,
        用户名: data.userName,
        手机号: data.phoneNum,
        账户余额: data.rmbBalance,
        '提现金额(元)': data.withDrawMount,
        持卡人: data.cardOwner,
        银行卡号: data.bankCardNo,
        银行名称: data.bankName,
        开户支行: data.branchBank,
      };
      dataTable.push(obj);
    });

    option.fileName = '提现审核';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        //sheetFilter:['项目名称','项目地址','考勤范围'],
        sheetHeader: [
          '提取时间',
          '交易号',
          '用户名',
          '手机号',
          '账户余额',
          '提现金额(元)',
          '持卡人',
          '银行卡号',
          '银行名称',
          '开户支行',
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel();
  };
}
