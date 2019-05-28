import upload from '../../models/Util'
import React from 'react'
import { Upload, Modal,message,Spin, Icon} from 'antd';
import styles from './PictureWall.less'

export default class PicturesWall extends React.Component {

  constructor(){
    super();
    this.pictures = [];
  }
  state = {
    loading:false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  /***
   * 设置url到pictures
   * @param index
   * @param file
   */
  setToPictures(index, file){
    this.pictures.push(file.head_img)
    this.props.setUrl(this.pictures);
  }

  handleChange = ({ file, fileList }) => {
    if (fileList.length > this.state.fileList.length){
      console.log("start upload....");
      let formData = new FormData();
      formData.append("file",file);
      this.setState({loading:true})
      upload(formData).then((data)=>{
        if (data.ret_msg === "上传成功"){
          this.setToPictures(fileList.length, data);
          this.setState({loading:false})
          message.success("上传成功");
        }else{
          this.setState({loading:false})
          message.info("失败");
        }
      })
    }
    this.setState({ fileList })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div style={{width:300}}>
        <Spin tip="上传中" spinning={this.state.loading}/>
        <Upload
          beforeUpload={(file) => {
            this.setState(({ fileList }) => ({
              fileList: [...fileList, file],
            }));
            return false;
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          className={styles.picture}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
