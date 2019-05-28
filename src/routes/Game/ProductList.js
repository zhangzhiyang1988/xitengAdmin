
import React from 'react'
import { Button, Popconfirm } from 'antd';
import ListTable from '../../components/Common/ListTable';
import { connect } from 'dva';
import ItemView from "../../components/Common/ItemFormView";
import CreateForm from "../../components/Common/CreateForm";


const title = [
  '商品代码',
  '商品图片',
  '商品名称',
  '商品副标题',
  '商品分类',
  '市场价',
  '上架时间',
  '商品链接',
  '状态',
];


const dataIndex = [
  'productCode',
  'productPic',
  'productName',
  'subTitle',
  'productCategory',
  'actualPrice',
  'onSaleTime',
  'url',
  'status',
];

const conditionConfig = [
  { title: '上架时间', span: 8, keyIndex: 'createTimePeriod', type: 'piker', options: null },
  { title: '商品分类', span: 5, keyIndex: 'productCategory', type: 'input', options: null },
  { title: '商品代码', span: 5, keyIndex: 'productCode', type: 'input', options: null },
  { title: '商品名称', span: 5, keyIndex: 'productName', type: 'input', options: null },
];

const itemConfig = [
  {title:"商品类别",key:"productCategory",type:'formItem'},
  {title:"商品代码",key:'productCode',type:'formItem'},
  {title:"副标题",key:"subTitle",type:'formItem'},
  {title:"市场价",key:"actualPrice",type:'formItem'},
  {title:"商品链接",key:"url",type:'formItem'},
  {title:"状态",key:"status",type:'show'},
  {title:"上架时间",key:"onSaleTime",type:'show'},
  {title:"图片",key:"productImage",type:'pictures'},
];

const createItemConfig = [
  {title:"商品类别",key:"productCategory",type:'formItem'},
  {title:"商品代码",key:'productCode',type:'formItem'},
  {title:"副标题",key:"subTitle",type:'formItem'},
  {title:"市场价",key:"actualPrice",type:'formItem'},
  {title:"商品链接",key:"url",type:'formItem'},
  {title:"图片",key:"productImage",type:'pictures'},
]


const statusConfig = ["全部","在售","下线"];
const fetchUrl = 'product/fetch'

@connect(({ product, loading }) => ({
  store: product,
  loading: loading.effects[fetchUrl],
}))



export  default class ProductList extends React.Component{
  constructor(){
    super();
    this.state = {modalVisible:false};
  }

  showItem(record){
    return <div>
      <ItemView data={record}
      submit={(values)=>{
        console.log("on submit....",values)
        this.props.dispatch({type:'product/update'})
      }}  pictureFlag='true' config={itemConfig} title="商品编辑"/>
    </div>
  }


  offline(record){
    console.log("offline"+JSON.stringify(record));
  }

  edit(record){
    console.log("edit"+JSON.stringify(record));
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
          <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
            <Popconfirm title={'编辑'} onConfirm={() => this.edit(record)}>
              <div style={{marginRight:10}}>
                <a href="">编辑</a>
              </div>
            </Popconfirm>
            |
            <Popconfirm title={'下架'} onConfirm={() => this.offline(record)}>
              <div style={{marginLeft:10}}>
                <a href="">下架</a>
              </div>
            </Popconfirm>
          </div>
        );
      },
    };
  }

  actionButton() {
    return (
      <Button
        icon="plus"
        type="primary"
        key='button'
        onClick={() => {
          console.log('onclick button to create activity');
          this.setState({ modalVisible: true });
        }}
        style={{ marginBottom: 20 }}
      >
        添加商品
      </Button>
    );
  }

  render(){
    const listConfig = { titleArray: title, dataIndexArray: dataIndex };
    return <div>
       <ListTable
         {...this.props}
         fetchUrl={fetchUrl}
         showItem={this.showItem.bind(this)}
         actionComponent={this.getActionComponent.bind(this)}
         conditionConfig={conditionConfig}
         statusConfig={statusConfig}
         listConfig={listConfig}
         actionButton={this.actionButton.bind(this)}
         columnWidth={150}
       />

       <CreateForm
         upload={()=>{
           console.log("upload...");
         }}
         title="添加商品"
         config={createItemConfig}
         modalVisible={this.state.modalVisible}
         submit={(msg)=>{
           console.log("添加商品submit.....",msg)
         }}
         handleModalVisible={() => {
           this.setState({ modalVisible: false });
         }}
       />
     </div>
   }
}
