export default class WidthDrawOrder {
  constructor(key) {
      this.key = key;
      this.id = 1;
      this.widthDrawTime = "2018-02-03:09:33:12";
      this.orderNo = "123124124"
      this.userName = "董甫耸";
      this.phoneNum = "189114523213";
      this.withDrawMount = 99.34;
      this.cardOwner = "张敏";
      this.bankCardNo = "20202939392";
      this.bankName = "工商银行";
      this.branchBank = "百万庄支行";
      this.status = "待审核";
      this.operator = "陈林";
      this.backlog="银行卡填写错误";
      this.confirmTime = "2018-03-03:09:33:12"
  }


  confirmOk(){
    this.status = "已经通过";
  }

  confirmFail(){
    this.status = "拒绝通过";
  }
}
