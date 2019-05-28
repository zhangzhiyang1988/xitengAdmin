import WidthDrawOrder from '../src/data/WidthDrawOrder';

export let getWidthDrawOrderListData = {
  list: [
    new WidthDrawOrder(1),
    new WidthDrawOrder(2),
    new WidthDrawOrder(3),
    new WidthDrawOrder(4),
    new WidthDrawOrder(5),
    new WidthDrawOrder(6),
    new WidthDrawOrder(7),
    new WidthDrawOrder(8),
  ],
  pageSize: 8,
  totalCount: 50,
  pageNo: 10,
};

export let confirmWithDrawFail = (id)=>{
  console.log("mock fail",id)
}

export let confirmWithDrawOk = (id)=>{
  console.log("mock ok", id)
}

export default {
  confirmWithDrawOk,
  confirmWithDrawFail,
  getWidthDrawOrderListData,
};
