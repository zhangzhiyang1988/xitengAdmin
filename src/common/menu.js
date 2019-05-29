import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '数据统计',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '订单管理',
    icon: 'appstore-o',
    path: 'order',
    children: [
      {
        name: '3D 0元抢订单',
        path: 'onediscount',
        children: [
          {
            name: '订单处理',
            path: 'winOrderList',
          },
          {
            name: '全部订单',
            path: 'orderList',
          },
        ],
      },
      {
        name: '0元抢黄金订单',
        path: 'zerobuy',
        children: [
          {
            name: '订单处理',
            path: 'winOrderList',
          },
          {
            name: '全部订单',
            path: 'orderList',
          },
        ],
      },
    ],
  },
  {
    name: '活动商品管理',
    icon: 'shop',
    path: 'game',
    children: [
      {
        name: '商品管理',
        path: 'productList',
      },
      {
        name: '活动管理',
        path: 'gameList',
      },
    ],
  },
  {
    name: '财务管理',
    icon: 'pay-circle-o',
    path: 'finance',

    children: [
      {
        name: '退款订单',
        path: 'refundOrderList',
      },
      {
        name: '提现11111111111审核',
        path: 'withdrawOrderTodoList',
      },
      {
        name: '原路退款审核列表',
        path: 'autoRefundOrderList',
      },
      {
        name: '提现报表',
        path: 'withdrawOrderList',
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'table',
    path: 'client',
    children: [
      {
        name: '基本信息',
        path: 'userList',
      },
      {
        name: '账户查询',
        path: 'accountRecordList',
      },
    ],
  },
  {
    name: '赛事管理',
    icon: 'form',
    path: 'stockGame',
    children: [
      {
        name: '赛事列表',
        path: 'gameList',
      },
      {
        name: '投注记录',
        path: 'guessRecordList',
      },
      {
        name: '获胜记录',
        path: 'rewardList',
      },
    ],
  },
  {
    name: '平台维护',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '运营商管理',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '货币管理',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '运营管理',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '评论管理',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
