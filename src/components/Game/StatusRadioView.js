


import * as React from "react";

import {Radio} from 'antd'

export default class StatusRadioView extends React.Component{
  constructor(){
    super();
    this.state = {radioType:1}
  }

  handleChangeRadio = e => {
    this.setState({
      radioType: e.target.value,
    });
  };

  render(){
    const {radioType} = this.state;
    return <div>
      <div>
        <Radio.Group value={radioType} onChange={this.handleChangeRadio}>
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="online">退款中</Radio.Button>
          <Radio.Button value="offline">已退款</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  }
}
