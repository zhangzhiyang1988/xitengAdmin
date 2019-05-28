import React from 'react';
import { connect } from 'dva';
import { Button, Popconfirm } from 'antd';
import ListTable from '../../components/Common/ListTable';
import ItemFormView from '../../components/Common/ItemFormView'
import CreateForm from '../../components/Common/CreateForm';
const title = [
  '活动模块',
  '商品代码',
  '期数',
  '商品名称',
  '商品分类',
  '一折价',
  '市场价',
  '总份数',
  '已购',
  '剩余',
  '参与总人数',
  '参与总金额',
  '使用喜币',
  '状态',
  '上线时间',
  '揭晓时间',
];

const dataIndex = [
  'gameType',
  'productCode',
  'gameStage',
  'productName',
  'productCategory',
  'oneDiscountPrice',
  'price',
  'targetCount',
  'purchaseCount',
  'restCount',
  'participatePersonCount',
  'totalRmb',
  'totalXtb',
  'gameStatus',
  'startTime',
  'openResultTime',
];

const showItemConfig = [
  {title:"活动类别",key:"gameType",type:'show'},
  {title:"商品代码",key:'productCode',type:'show'},
  {title:"商品名称",key:"productName",type:'show'},
  {title:"商品分类",key:"productCategory",type:'show'},
  {title:"活动期数",key:"gameStage",type:'show'},
  {title:"活动状态",key:"gameStatus",type:'show'},
  {title:"已购份数",key:"purchaseCount",type:'show'},
  {title:"剩余份数",key:"restCount",type:'show'},
  {title:"参与人数",key:"participatePersonCount",type:'show'},
];


const createItemConfig = [
  {title:"活动类别",key:"gameType",type:'formItem'},
  {title:"商品代码",key:'productCode',type:'formItem'},
  {title:"活动期数",key:"gameStage",type:'formItem'},
];


const conditionConfig = [
  { title: '上线时间', span: 8, keyIndex: 'starTimePeriod', type: 'piker', options: null },
  {
    title: '活动模块',
    span: 5,
    keyIndex: 'gameType',
    type: 'selector',
    options: ['限时抢购', '普通活动', '超值精选'],
  },
  { title: '商品分类', span: 5, keyIndex: 'productCategory', type: 'input', options: null },
  { title: '商品代码', span: 5, keyIndex: 'productCode', type: 'input', options: null },
  { title: '商品名称', span: 8, keyIndex: 'productName', type: 'input', options: null },
  { title: '期数', span: 5, keyIndex: 'gameStage', type: 'input', options: null },
];


const statusConfig = ['全部', '活动中', '已揭晓'];

@connect(({ game, loading }) => ({
  store: game,
  loading: loading.effects['game/fetch'],
}))

export default class GameList extends React.Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }
  /**
   * 确认下线
   * @param record
   */
  confirmShutDown(record) {
    console.log('click confirm', record);
    this.props.dispatch({
      type: '',
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
        return (
          <Popconfirm title={'下线'} onConfirm={() => this.confirmShutDown(record)} key={record.id}>
            <Button type="primary" className="confirm">
              下线
            </Button>
          </Popconfirm>
        );
      },
    };
  }

  /**
   * 注入下面的详情
   * @param record
   * @returns {XML}
   */
  showItem(record) {
    return (
      <ItemFormView
        data={record}
        title="活动编辑"
        config={showItemConfig}
      />
    );
  }

  actionButton() {
    return (
      <Button
        key='action'
        icon="plus"
        type="primary"
        onClick={() => {
          console.log('onclick button to create activity');
          this.setState({ modalVisible: true });
        }}
        style={{ marginBottom: 20 }}
      >
        添加活动
      </Button>
    );
  }

  render() {
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return (
      <div>
        <ListTable
          {...this.props}
          fetchUrl="game/fetch"
          showItem={this.showItem.bind(this)}
          actionComponent={this.getActionComponent.bind(this)}
          conditionConfig={conditionConfig}
          statusConfig={statusConfig}
          listConfig={listConfig}
          actionButton={this.actionButton.bind(this)}
          columnWidth={150}
        />
        <CreateForm
          setUrl={(url)=>{
            console.log("seturl"+url);
          }}
          submit={()=>{
            console.log("submit game....");
          }}
          title="新建一折购活动"
          config={createItemConfig}
          modalVisible={this.state.modalVisible}
          handleModalVisible={() => {
            this.setState({ modalVisible: false });
          }}
        />
      </div>
    );
  }
}
