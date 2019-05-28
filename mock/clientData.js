import UserItem from '../src/data/UserData';
import AccountRecordItem from '../src/data/AccountRecordItem';

export const getUserListData = {
  list: [
    new UserItem(1),
    new UserItem(2),
    new UserItem(3),
    new UserItem(4),
    new UserItem(5),
    new UserItem(6),
    new UserItem(7),
    new UserItem(8),
  ],
  pageSize: 8,
  totalCount: 50,
  pageNo: 10,
};

export const getAccountRecordListData = {
  list: [
    new AccountRecordItem(1),
    new AccountRecordItem(2),
    new AccountRecordItem(3),
    new AccountRecordItem(4),
    new AccountRecordItem(5),
    new AccountRecordItem(6),
    new AccountRecordItem(7),
    new AccountRecordItem(8),
  ],
  pageSize: 8,
  totalCount: 50,
  pageNo: 10,
};

export default {
  getUserListData,
  getAccountRecordListData
};
