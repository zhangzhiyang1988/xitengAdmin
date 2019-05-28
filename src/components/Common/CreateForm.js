import React from 'react';
import {Form, Modal} from 'antd';
import {ItemFormView} from './ItemFormView'

class NewItemView extends React.Component{
  constructor(props){
    super(props);
  }

  okHandle() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.form.resetFields();
      console.log("NewItemView",fieldsValue);
      this.props.submit(fieldsValue);
      this.props.handleModalVisible();
    });
  };

  render(){
    const { modalVisible, handleModalVisible, config, title } = this.props;


    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={this.okHandle.bind(this)}
        onCancel={() => {
          this.props.form.resetFields();
          handleModalVisible()
        }}
      >
        <ItemFormView
          form={this.props.form}
          config={config}
          formType="create"
        />

      </Modal>
    );
  }
}
const CreateForm = Form.create()(NewItemView);

export default CreateForm;
