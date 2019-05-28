import refundOrder from '../src/data/refundOrder';

export const getRefundOrderListData = {
  list: [
    new refundOrder(1),
    new refundOrder(2),
    new refundOrder(3),
    new refundOrder(4),
    new refundOrder(5),
    new refundOrder(6),
    new refundOrder(7),
    new refundOrder(8),
  ],
  pageSize: 8,
  totalCount: 50,
  pageNo: 10,
};

export default {
  getRefundOrderListData,
};
