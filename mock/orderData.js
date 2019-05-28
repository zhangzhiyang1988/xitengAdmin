import OrderItem from '../src/data/OrderItem';

export const getOrderListData = {
  list: [
    new OrderItem(1),
    new OrderItem(2),
    new OrderItem(3),
    new OrderItem(4),
    new OrderItem(5),
    new OrderItem(6),
    new OrderItem(7),
    new OrderItem(8),
    new OrderItem(9),
  ],
  totalCount: 50,
  pageSize: 8,
  pageNo: 10,
};

export default {
  getOrderListData,
};
