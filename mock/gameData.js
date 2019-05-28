import GameItem from '../src/data/GameItem';

export const getGameListData = {
  list: [
    new GameItem(1),
    new GameItem(2),
    new GameItem(3),
    new GameItem(4),
    new GameItem(5),
    new GameItem(6),
    new GameItem(7),
    new GameItem(8),
  ],
  pageSize: 8,
  totalCount: 50,
  pageNo: 10,
};

export default {
  getGameListData,
};
