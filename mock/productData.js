
import ProductItem from '../src/data/ProductItem';

export const getProductListData = {
  list: [
    new ProductItem(1),
    new ProductItem(2),
    new ProductItem(3),
  ],
  totalCount: 50,
  pageSize: 8,
  pageNo: 10,
};

export default {
  getProductListData,
};
