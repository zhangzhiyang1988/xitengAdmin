import React from 'react';
import { Form} from 'antd';
import ConditionView from "../Common/ConditionView";

class OrderConditionView extends React.Component{

    render(){
      if (this.props.conditionConfig === undefined){
        return null;
      }
        return <ConditionView form={this.props.form} search={this.props.search}
                              setConditons = {this.props.setConditons}
                              conditionConfig={this.props.conditionConfig} lineCount={4}/>
    }
}

const OrderConditionTable = Form.create()(OrderConditionView);
export default OrderConditionTable;
