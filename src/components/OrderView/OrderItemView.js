import React from 'react';
import { Divider, Button, Popconfirm, Icon, Row, Col, Avatar, Popover } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
import styles from './OrderItemView.less';

class RowItem extends React.Component {
  render() {
    return (
      <div className={styles.rowInfo}>
        <div>{this.props.title}</div>
        <div>{this.props.value}</div>
      </div>
    );
  }
}
class PopoverView extends React.Component {
  state = {
    clicked: false,
    hovered: false,
  };
  handleHoverChange = visible => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  };

  handleClickChange = visible => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };

  render() {
    let groupArr = this.props.groupArr;
    const clickContent = (
      <div>
        {groupArr.map((groupvalue, index) => {
          return (
            <Row key={'*' + index}>
              {groupvalue.map((value, index) => {
                return (
                  <Col span={8} key={'*' + index} style={{ marginBottom: '10px' }}>
                    <div className={styles.rowInfo}>
                      <Avatar src={value.headerImg} szie={32} />
                      <div className={styles.itemMargin}>
                        {value.name + '  ' + (value.identity = 'originator' ? '发起拼单' : '参与')}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    );
    return (
      <Popover
        // style={{ }}
        content={<div>{clickContent}</div>}
        title="拼单详情"
        trigger="click"
        visible={this.state.clicked}
        onVisibleChange={this.handleClickChange}
      >
        <Button>查看更多</Button>
      </Popover>
    );
  }
}
class GroupDetail extends React.Component {
  state = {
    showMore: false,
  };
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles.itemMargin}>拼单详情:</div>
        <div>
          {this.props.groupArr.map((groupDetail, index) => {
            return index === 0 ? (
              <Row key={'*' + index}>
                {groupDetail.map((value, index) => {
                  return (
                    <Col span={24 / groupDetail.length} key={'*' + index}>
                      <div className={styles.rowInfo}>
                        <Avatar src={value.userIconUrl} size="small" />
                        <div className={styles.itemMargin}>
                          {value.name +
                            '  ' +
                            (value.identity = 'originator' ? '发起拼单' : '参与')}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : null;
          })}
        </div>
        {this.props.groupArr.length > 1 ? <PopoverView groupArr={this.props.groupArr} /> : null}
      </div>
    );
  }
}
export default class OrderItemView extends React.Component {
  render() {
    const { order, confirmSend } = this.props;

    let productTitles = ['商品模块', '商品代码', '期数', '商品名称', '单价', '抢购份数'];
    let productContents = [
      order.productInfo,
      order.productNo,
      order.gameStage,
      order.productName,
      order.oneDiscountPrice,
      order.buyMount,
    ];
    let groupArr = this._getGroupArr(order);
    let winPrize = this._getWinPrize(order);
    return (
      <div>
        <div className={styles.title}>
          <Icon type="file-text" />
          <div style={{ marginLeft: 10 }}>订单详情</div>
        </div>

        <div className={styles.orderContainer}>
          <div className={styles.leftView}>
            <div className={styles.rowInfo}>
              <div className={styles.itemMargin}>订单号:{order.orderNo}</div>
              <div className={styles.itemMargin}>下单时间:{order.orderTime}</div>
              <div className={styles.itemMargin}>揭晓时间:{order.orderTime}</div>
              <div className={styles.itemMargin}>中签号码:{order.openCode}</div>
            </div>
            <div className={styles.line} />
            {/*<Divider />*/}
            <div>
              <div>
                收货人: {order.receiverName} {order.receiverPhoneNum}
              </div>
              <div>收货地址: {order.receiveAddress} </div>
            </div>
            <div className={styles.line} />
            {/*<Divider />*/}

            <div>
              {order.orderType === 'oneDiscountGameOrder' ? (
                <div className={styles.flexRow}>
                  <div className={styles.itemMargin}>参与方式: {order.participateType}</div>
                  <div className={styles.itemMargin} style={{ marginLeft: '20px' }}>
                    拼单状态: {order.groupStatus}
                  </div>
                </div>
              ) : (
                <div className={styles.flexRow}>
                  <div className={styles.itemMargin}>完成拼团: {order.finishGroupCount}</div>
                </div>
              )}

              {groupArr.length > 0 ? <GroupDetail groupArr={groupArr} /> : null}

              <Divider />

              <div>
                <Row>
                  {productTitles.map((value, index) => {
                    return (
                      <Col key={'*' + index} span={4}>
                        {value}
                      </Col>
                    );
                  })}
                </Row>
                <Row>
                  {productContents.map((value, index) => {
                    return (
                      <Col key={'*' + index} span={4}>
                        {value}
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div className={styles.line} />
              <div>
                {order.finishInviteGroupModel ? (
                  <div>获得号码：{order.finishInviteGroupModel.length}个</div>
                ) : null}

                <Popover
                  content={
                    <div>
                      <Row>
                        {this._getLuckyCodeArr(order).map((value, index) => {
                          return (
                            <Col span={1} key={'*' + index}>
                              <div>{value}</div>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  }
                  title={order.orderType === 'oneDiscountGameOrder' ? '抢购号码' : '我的号码'}
                >
                  <div className={styles.luckyText}>{this._getLuckyCode(order)}</div>
                </Popover>
                {order.winGradeList ? <div>中奖详情：{winPrize}</div> : null}
              </div>
            </div>
          </div>

          <div className={styles.rightView}>
            <div>
              <RowItem title="商品金额" value={order.productPrice} />
              <RowItem title="喜币" value={order.xtbMount} />
              <RowItem title="运费" value={order.deliveryMount} />
              <RowItem title="实付金额" value={order.actualPayMont} />
              <RowItem title="付款方式" value={order.payType} />
            </div>
            {order.hasSendGoods !== null &&
            order.hasSendGoods !== undefined &&
            false === order.hasSendGoods &&
            order.hasWin === true ? (
              <div>
                <div className={styles.flexRow}>
                  <div>备注:</div>
                  <TextArea rows={4} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Popconfirm title="确认发货?" onConfirm={() => confirmSend(order.id)}>
                    <Button type="primary" className="confirm">
                      确认发货
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
    console.log(JSON.stringify(order));
  }
  _getGroupArr(order) {
    // 零元购和一折购的 拼团数据结构不一致处理成统一
    let groupArr = [];
    if (order.orderType === 'oneDiscountGameOrder') {
      // 一折购
      let itemArr = [];
      let tempArr =
        order.discountGameGroupModel &&
        order.discountGameGroupModel.groupUserModelList instanceof Array
          ? order.discountGameGroupModel.groupUserModelList
          : [];
      tempArr.map(value => {
        let tempItem = {};
        tempItem.identity = value.identity;
        tempItem.name = value.name;
        tempItem.userIconUrl = value.iconUrl;
        itemArr.push(tempItem);
      });
      groupArr.push(itemArr);
    } else {
      //零元抢
      if (order.finishInviteGroupModel instanceof Array) {
        order.finishInviteGroupModel.map(value => {
          let arritem = [];
          let itmdic = value.ownerUser;
          itmdic.identity = 'originator';
          arritem.push(itmdic);
          arritem = arritem.concat(value.acceptUserList);
          groupArr.push(arritem);
        });
      }
    }
    return groupArr;
  }
  _getLuckyCodeArr(order) {
    let luckyCodeArr = [];
    if (order.orderType === 'oneDiscountGameOrder') {
      luckyCodeArr = order.purchaseCode;
    } else {
      if (order.finishInviteGroupModel != undefined) {
        order.finishInviteGroupModel.map(value => {
          luckyCodeArr.push(value.luckyCode);
        });
      }
    }

    return luckyCodeArr;
  }
  _getLuckyCode(order) {
    let luckyCodeStr = '';
    if (order.orderType === 'oneDiscountGameOrder') {
      luckyCodeStr = luckyCodeStr + '抢购号码：';
      luckyCodeStr = luckyCodeStr + order.purchaseCode.join(',');
    } else {
      luckyCodeStr = luckyCodeStr + '我的号码：';
      if (order.finishInviteGroupModel != undefined) {
        order.finishInviteGroupModel.map(value => {
          luckyCodeStr = luckyCodeStr + '  ' + value.luckyCode;
        });
      }
    }

    return luckyCodeStr;
  }

  _getWinPrize(order) {
    if (!order.winGradeList) return '';
    let prize = '';
    let i = 0;
    while (i < order.winGradeList.length) {
      prize += order.winGradeList[i] + '  ' + order.winGoodsList[i] + '  ';
      i++;
    }
    return prize;
  }
}
