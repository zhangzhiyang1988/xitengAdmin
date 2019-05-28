import React from 'react';
import { Form, DatePicker, Button, Row, Col, Input, Select } from 'antd';
const RangePicker = DatePicker.RangePicker;
import styles from '../OrderView/OrderConditionView.less';
const FormItem = Form.Item;

class ConditionItem extends React.Component {
  handleSelectChange(value) {
    console.log(value);
    this.props.form.setFieldsValue({
      note: value,
    });
  }

  showOptions(options) {
    return options.map((value, index) => {
      return (
        <Option key={index} value={`${value}`}>
          {value}
        </Option>
      );
    });
  }

  configItem() {
    //no use
    const config = { rules: [{ required: false, message: `请输入${this.props.title}` }] };
    const { type, form, keyIndex, options, title } = this.props;
    const { getFieldDecorator } = form;

    if (type === 'piker') {
      return getFieldDecorator(keyIndex, { config })(<RangePicker />);
    } else if (type === 'input') {
      const info = '请输入' + title;
      return getFieldDecorator(keyIndex, { config })(<Input placeholder={info} />);
    } else {
      const info = '请选择' + title;
      return getFieldDecorator(keyIndex, { config })(
        <Select placeholder={info} onChange={this.handleSelectChange.bind(this)}>
          {this.showOptions(options)}
        </Select>
      );
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };

    return (
      <FormItem {...formItemLayout} label={this.props.title}>
        {this.configItem()}
      </FormItem>
    );
  }
}

export default class ConditionView extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.setConditons(values);
        this.props.search();
      }
    });
  }

  configRow(start, lineCount, conditionConfig) {
    let array = [];
    let count = 0;
    let totalCount = conditionConfig.length;
    for (; count < lineCount && count + start < totalCount; count++) {
      const config = conditionConfig[count + start];
      array.push(
        <Col span={config.span} key={'col' + start + count}>
          <ConditionItem
            title={config.title}
            form={this.props.form}
            keyIndex={config.keyIndex}
            type={config.type}
            options={config.options}
            key={start + count + 'conditionItem'}
          />
        </Col>
      );
    }

    if (count + start === totalCount && count < lineCount) {
      array.push(this.configButton(start + count));
    }
    return {
      row: (
        <Row key={start + count} gutter={16}>
          {array}
        </Row>
      ),
      count: count,
    };
  }

  configButton(key) {
    return (
      <Col key={key} span={5} style={{ textAlign: 'right' }}>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            查询
          </Button>
          <Button
            onClick={() => {
              this.props.form.resetFields();
              this.props.setConditons({});
            }}
          >
            重置
          </Button>
        </FormItem>
      </Col>
    );
  }

  conditionArray(lineCount, conditionConfig) {
    let array = [];
    let i = 0;
    while (i < conditionConfig.length) {
      let rowObj = this.configRow(i, lineCount, conditionConfig);
      i += rowObj.count;
      array.push(rowObj.row);
    }

    if (i % lineCount === 0) {
      array.push(
        <Row key={'button' + i} gutter={16}>
          {this.configButton()}
        </Row>
      );
    }
    return array;
  }

  render() {
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form className={styles.conditionForm} onSubmit={this.handleSubmit.bind(this)}>
          {this.conditionArray(this.props.lineCount, this.props.conditionConfig)}
        </Form>
      </div>
    );
  }
}
