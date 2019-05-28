import React from 'react';
import { Form, Input, Button, Icon, Radio } from 'antd';
const FormItem = Form.Item;
import styles from './ItemFormView.less';
import PicturesWall from './PicturesWall';

export class ItemFormView extends React.Component {
  constructor(props) {
    super(props);
    this.pictures = [];
    if (props.pictures !== undefined) {
      this.pictures = props.pictures;
    }
  }

  okHandle = () => {
    const { form, submit } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      submit({
        ...fieldsValue,
        pictures: this.pictures,
      });
    });
  };

  item(index, lable, key, value, type) {
    const form = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    let rule = { required: false, message: null };

    if (this.props.formType === 'create') {
      const info = '请输入' + lable;
      rule = { required: true, message: info };
    }

    if (type === 'formItem') {
      return (
        <div style={{ marginBottom: 10 }} key={index}>
          <FormItem key={index} className={styles.itemStyle} {...formItemLayout} label={lable}>
            {form.getFieldDecorator(key, {
              initialValue: value,
              rules: [rule],
            })(<Input />)}
          </FormItem>
        </div>
      );
    } else if (type === 'show') {
      return (
        <div key={index} className={styles.showStyle}>
          <div>
            {lable}: {value}
          </div>
        </div>
      );
    } else if (type === 'selected') {
      const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
      return (
        <FormItem key={index} className="collection-create-form_last-form-item">
          {form.getFieldDecorator(key, {
            initialValue: 1,
            rules: [rule],
          })(
            <Radio.Group>
              {lable.map((record, key) => {
                return (
                  <Radio key={key} style={radioStyle} value={key + 1}>
                    {record}
                  </Radio>
                );
              })}
            </Radio.Group>
          )}
        </FormItem>
      );
    } else if (type === 'text') {
      return (
        <FormItem key={index} label={lable}>
          {form.getFieldDecorator(key)(<Input type="textarea" />)}
        </FormItem>
      );
    }
  }

  showTitle() {
    if (this.props.title === undefined) {
      return null;
    }
    return (
      <div className={styles.recordTitle}>
        <div style={{ marginLeft: 10 }}>
          <span>
            <Icon type="file-text" />
          </span>
          <span style={{ marginLeft: 10 }}>{this.props.title}</span>
        </div>
      </div>
    );
  }

  showItems() {
    return this.props.config.map((record, index) => {
      const key = record.key;
      const title = record.title;
      const type = record.type;
      let value = '';
      if (this.props.data !== undefined) {
        value = this.props.data[key];
      }
      return this.item(index, title, key, value, type);
    });
  }

  showButton() {
    if (this.props.submit === undefined) {
      return null;
    }
    if (this.props.formType === 'create') {
      return null;
    }
    return (
      <FormItem style={{ marginLeft: 10 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
          提交
        </Button>
        <Button
          onClick={() => {
            this.props.form.resetFields();
          }}
        >
          重置
        </Button>
      </FormItem>
    );
  }

  showPicture() {
    if (this.props.pictureFlag === undefined) {
      return null;
    }
    return (
      <div key="picture" style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <div style={{ marginLeft: 10, marginRight: 30 }}>图片</div>
        <PicturesWall
          setUrl={pictures => {
            this.pictures = pictures;
          }}
        />
      </div>
    );
  }

  render() {
    const form = this.props.form;
    const product = this.props.product;

    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };

    let style = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    };

    if (this.props.formType === 'create') {
      style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      };
    }

    return (
      <Form className={styles.formContainer} onSubmit={() => this.okHandle()}>
        {this.showTitle()}
        <div style={{ padding: 10 }}>
          <div style={style}>
            {this.showItems()}
            {this.showPicture()}
          </div>
          {this.showButton()}
        </div>
      </Form>
    );
  }
}

const CreateForm = Form.create()(ItemFormView);

export default class ItemView extends React.Component {
  render() {
    if (this.props.data === undefined) {
      return null;
    }
    return (
      <CreateForm
        data={this.props.data}
        pictureFlag={this.props.pictureFlag}
        formType="show"
        config={this.props.config}
        title={this.props.title}
        submit={this.props.submit}
      />
    );
  }
}
