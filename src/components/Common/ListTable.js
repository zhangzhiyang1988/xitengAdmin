import React from 'react';
import ConditionTable from '../OrderView/OrderConditionView';
import { Table, Button } from 'antd';
import styles from './ListTable.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class StatusTable extends React.Component {
  constructor() {
    super();
    this.state = { selectedKey: 0 };
  }
  showStatus() {
    return this.props.statusArray.map((status, key) => {
      let type = '';
      if (key === this.state.selectedKey) {
        type = 'primary';
      }
      return (
        <Button
          key={key}
          style={{ height: 25, marginRight: 2, marginBottom: 8 }}
          type={type}
          onClick={() => {
            this.setState({ selectedKey: key });
            this.props.search(status);
          }}
        >
          {status}
        </Button>
      );
    });
  }
  render() {
    return <div>{this.showStatus()}</div>;
  }
}

export default class ListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRecord: null,
      currentPage: 1,
    };
    //不能用state
    this.selectStatus = '全部';
    this.conditions = { status: '全部' };
    const { titleArray, dataIndexArray } = this.props.listConfig;

    this.columnWidth = this.props.columnWidth;
    const xScope = (this.columnWidth + 20) * dataIndexArray.length;
    this.scroll = { x: xScope, y: 400 };
  }

  componentWillMount() {
    this.request(1, null);
  }

  search() {
    this.request(1, { ...this.conditions, status: this.selectStatus });
    this.setState({
      ...this.state,
      selectRecord: {},
      currentPage: 1,
    });
  }

  pageRequest(pageNo) {
    const conditions = { ...this.conditions, status: this.selectStatus };
    this.request(pageNo, conditions);
  }

  /**
   * 获取列表信息
   * @param pageNo
   * @param conditions
   */
  request(pageNo, conditions) {
    const type = this.props.fetchUrl;
    const msg = {
      pageNo: pageNo - 1,
      pageSize: 16,
      orderType: this.props.orderType,
      ...conditions,
    };
    console.log('request msg:' + JSON.stringify(msg));

    if (this.props.dispatch !== undefined) {
      this.props.dispatch({
        type: type,
        payload: msg,
      });
    } else {
      console.log('do not inject store...');
    }
  }

  setSelectRecord(record) {
    this.setState({ selectRecord: record });
  }

  showRecordInfo() {
    if (this.state.selectRecord !== null && this.props.showItem) {
      return this.props.showItem(this.state.selectRecord);
    }
  }

  getColumns() {
    const { actionComponent } = this.props;
    const { titleArray, dataIndexArray } = this.props.listConfig;
    const columns = [];
    for (let i = 0; i < titleArray.length; i += 1) {
      if (titleArray[i] === '抢购号码') {
        columns.push({
          title: titleArray[i],
          width: this.columnWidth,
          dataIndex: dataIndexArray[i],
          key: dataIndexArray[i],
          render: value => {
            return <div className={styles.numbertext}>{value.join(',')}</div>;
          },
        });
      } else {
        columns.push({
          title: titleArray[i],
          width: this.columnWidth,
          dataIndex: dataIndexArray[i],
          key: dataIndexArray[i],
        });
      }
    }

    /**
     * 添加按钮
     */
    if (actionComponent !== undefined && actionComponent !== null) {
      columns.push(actionComponent());
      console.log('添加按钮.......');
    }

    console.log(columns.length);
    return columns;
  }

  showButton() {
    let array = [];
    const { actionButton } = this.props;
    array.push(actionButton && actionButton());
    return array;
  }

  render() {
    const { loading, conditionConfig } = this.props;
    const { list, totalCount, pageSize } = this.props.store;
    // console.log("ListTable receive listData", JSON.stringify(list));
    return (
      <PageHeaderLayout>
        <div>
          <ConditionTable
            conditionConfig={conditionConfig}
            setConditons={condition => {
              this.conditions = { ...condition };
            }}
            search={this.search.bind(this)}
          />
          <div className={styles.buttonContainer}>
            {this.showStatusTable()}
            {this.showButton()}
          </div>
          <Table
            onRow={record => {
              return {
                onClick: () => {
                  this.setSelectRecord(record);
                }, // 点击行
              };
            }}
            columns={this.getColumns()}
            dataSource={list}
            loading={loading}
            pagination={{
              total: totalCount,
              pageSize: pageSize,
              current: this.state.currentPage,
              onChange: (page, pageSize) => {
                this.setState({
                  ...this.state,
                  currentPage: page,
                });
                this.pageRequest(page);
              },
            }}
            scroll={this.scroll}
          />
          {this.showRecordInfo()}
        </div>
      </PageHeaderLayout>
    );
  }

  showStatusTable() {
    const { statusConfig } = this.props;
    if (statusConfig !== undefined && statusConfig !== null) {
      return (
        <StatusTable
          statusArray={this.props.statusConfig}
          search={status => {
            this.selectStatus = status;
            this.search();
          }}
        />
      );
    } else {
      return null;
    }
  }
}
