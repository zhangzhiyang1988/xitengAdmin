/**
 * Created by zzy on 2018/11/14.
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '../../components/Charts';
import styles from './Analysis.less';
const { TabPane } = Tabs;
import NumberInfo from '../../components/NumberInfo';
import Areanull from '../../components/Charts/Areanull/Areanull';
import numeral from 'numeral';
import moment from 'moment';
import Trend from '../../components/Trend';
import Series from '../../components/Charts/Series/Series';
import Groupedcolumn from '../../components/Charts/Groupedcolumn/Groupedcolumn';
import Basiccolumn from '../../components/Charts/Basiccolumn/Basiccolumn';
import BasicArea from '../../components/Charts/BasicArea/BasicArea';
import ConditionTable from '../../components/OrderView/OrderConditionView';

import img_zhuce from '../../assets/analysis/icon_1zhuce.png';
import img_huoyue from '../../assets/analysis/icon_2huoyue.png';
import img_huiyuan from '../../assets/analysis/icon_3huiyuan.png';
import img_huifei from '../../assets/analysis/icon_4huifei.png';
import img_jiaoyi from '../../assets/analysis/icon_5jiaoyi.png';
import img_jinzhuan from '../../assets/analysis/icon_6jinzhuan.png';
import img_zhongqian from '../../assets/analysis/icon_7zhongqian.png';

@connect(({ analysis, loading }) => ({
  vipUserAmount: analysis,
  loading: loading.effects['analysis/fetch'],
}))
export default class UserAnalysis extends Component {
  state = {
    currentTabKey: '',
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  render() {
    const { chart, loading } = this.props;
    const tabData = [
      { name: '注册用户', count: 1000, uri: img_zhuce },
      { name: '活跃用户', count: 688, uri: img_huoyue },
      { name: '会员人数', count: 5456, uri: img_huiyuan },
      { name: '会员费金额', count: 121, uri: img_huifei },
      { name: '交易金额', count: 7535, uri: img_jiaoyi },
      { name: '0元抢金砖中签', count: 53563, uri: img_jinzhuan },
      { name: '0元抢购中签', count: 4553, uri: img_zhongqian },
    ];
    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Col gutter={0} type="flex" style={{ width: 138 }} justify="center" align="center">
        <img src={data.uri} alt="" />
        <h3>{data.name}</h3>
        <div>
          <span>{data.count}</span>
        </div>
      </Col>
    );
    const { currentTabKey } = this.state;
    const activeKey = currentTabKey || (tabData[0] && tabData[0].name);

    const conditionConfig = [
      { title: '订单时间', span: 8, keyIndex: 'createTimePeriod', type: 'piker', options: null },
    ];
    return (
      <Fragment>
        <ConditionTable
          conditionConfig={conditionConfig}
          setConditons={condition => {}}
          search={() => {}}
        />
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
              {tabData.map((tab, index) => (
                <TabPane tab={<CustomTab data={tab} currentTabKey={activeKey} />} key={tab.name}>
                  <div style={{ padding: '50px 24px' }}>
                    {this.getChartView(index, this.vipUserAmount)}
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </Card>
      </Fragment>
    );
  }
  componentWillMount() {
    if (this.props.dispatch !== undefined) {
      console.log('获取会员人数-----------');
      this.props.dispatch({
        type: 'analysis/fetch',
        payload: {},
      });
    }
  }
  getChartView(index, vipUserAmount) {
    console.log('会员人数-------' + JSON.stringify(vipUserAmount));
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    const salesPieData = [
      {
        x: '黄金会员',
        y: 4544,
      },
      {
        x: '铂金会员',
        y: 3321,
      },
      {
        x: '钻石会员',
        y: 3113,
      },
    ];

    const Yuan = ({ children }) => <span dangerouslySetInnerHTML={{ __html: yuan(children) }} />;

    switch (index) {
      case 0:
        return (
          <div>
            <BasicArea />
          </div>
        );
        break;
      case 1:
        return (
          <TimelineChart
            height={400}
            data={this.getChartData()}
            titleMap={{ y1: '新用户', y2: '老用户' }}
          />
        );
        break;
      case 2:
        return (
          <div>
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={true}
                  title={<ChartTitle title="黄金会员" count={100} />}
                  footer={<Field label="新增人数" value={numeral(1234).format('0,0')} />}
                  contentHeight={46}
                >
                  <MiniArea color="#975FE4" data={this.getMiniAreaData()} height={46} />
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={true}
                  title={<ChartTitle title="铂金会员" count={4343} />}
                  footer={<Field label="新增人数" value={numeral(1234).format('0,0')} />}
                  contentHeight={46}
                >
                  <MiniArea color="#78BBFF" data={this.getMiniAreaData()} height={46} />
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={true}
                  title={<ChartTitle title="钻石会员" count={453453} />}
                  footer={<Field label="新增人数" value={numeral(1234).format('0,0')} />}
                  contentHeight={46}
                >
                  <MiniArea color="#64C494" data={this.getMiniAreaData()} height={46} />
                </ChartCard>
              </Col>
            </Row>
            <Series />
          </div>
        );
        break;
      case 4:
        return (
          <div>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="交易金额" key="sales">
                <Areanull />
              </TabPane>
              <TabPane tab="交易订单" key="orders">
                <Areanull />
              </TabPane>
            </Tabs>
          </div>
        );
        break;
      case 3:
        return (
          <div>
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={true}
                  title="黄金会员（19.80/年）"
                  footer={<Field label="总交易数" value={1224} />}
                  contentHeight={46}
                >
                  <Row>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      增长<span className={styles.trendText}>200</span>
                    </Trend>
                    <span>
                      总<span style={{ color: 'red', fontSize: 20 }}>21531</span>
                      <span>元</span>
                    </span>
                  </Row>
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={true}
                  title="黄金会员（29.80/年）"
                  footer={<Field label="总交易数" value={1224} />}
                  contentHeight={46}
                >
                  <Row>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      增长<span className={styles.trendText}>200</span>
                    </Trend>
                    <span>
                      总<span style={{ color: 'red', fontSize: 20 }}>21531</span>
                      <span>元</span>
                    </span>
                  </Row>
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={true}
                  title="黄金会员（99.00/年）"
                  footer={<Field label="总交易数" value={1224} />}
                  contentHeight={46}
                >
                  <Row>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      增长<span className={styles.trendText}>200</span>
                    </Trend>
                    <span>
                      总<span style={{ color: 'red', fontSize: 20 }}>21531</span>
                      <span>元</span>
                    </span>
                  </Row>
                </ChartCard>
              </Col>
            </Row>
            <Row>
              <Col style={{ height: 400, width: screen.width / 2 }} {...topColResponsiveProps}>
                <TimelineChart
                  height={400}
                  data={this.getChartData()}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                  style={{ height: 400, width: 400 }}
                />
              </Col>
              <Col style={{ height: 400, width: 400 }} {...topColResponsiveProps}>
                <Pie
                  hasLegend
                  title="销售额"
                  subTitle="销售额"
                  total={() => (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                      }}
                    />
                  )}
                  data={salesPieData}
                  valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                  height={294}
                />
              </Col>
            </Row>
          </div>
        );
        break;
      case 5:
        return (
          <div>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="抢购人数" key="sales">
                <Groupedcolumn />
              </TabPane>
              <TabPane tab="黄金克数" key="orders">
                <Basiccolumn />
              </TabPane>
            </Tabs>
          </div>
        );
        break;
      case 6:
        return <Series />;
        break;
    }
  }

  getMiniAreaData() {
    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    return visitData;
  }

  getChartData() {
    const chartData = [];
    for (let i = 0; i < 20; i += 1) {
      chartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }
    return chartData;
  }
}

class ChartTitle extends React.Component {
  render() {
    let { title, count } = this.props;
    return (
      <span style={{ fontWeight: 'bold' }}>
        {title}
        <span>
          {' '}
          总<span style={{ color: 'red', fontSize: 20 }}>{count}</span>
          <span>人</span>
        </span>
      </span>
    );
  }
}
