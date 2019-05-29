import { stringify } from 'qs';
import request from '../utils/request';
const baseUrl = '/xitenggamejar';
export async function queryProjectNotice() {
  return request(baseUrl + '/project/notice');
}

export async function queryActivities() {
  return request(baseUrl + '/activities');
}

export async function queryRule(params) {
  return request(baseUrl + `/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request(baseUrl + '/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request(baseUrl + '/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request(baseUrl + '/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request(baseUrl + '/fake_chart_data');
}

export async function getOrderList(params) {
  let url =
    params.orderType === 'oneDiscountGameOrder'
      ? baseUrl + '/discountGameAdmin/discountGameOrder/oneDiscountGameOrderList'
      : baseUrl + '/discountGameAdmin/discountGameOrder/zeroDiscountGameOrderList';
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function confirmSend(params) {
  return request(baseUrl + '/onediscountorder/confirmSend', {
    method: 'POST',
    body: params,
  });
}

export async function getRefundOrderList(params) {
  return request(baseUrl + '/onediscountfinance/refundOrderList', {
    method: 'POST',
    body: params,
  });
}

export async function getGameList(params) {
  return request(baseUrl + '/onediscountgame/gameList', {
    method: 'POST',
    body: params,
  });
}

export async function getUserList(params) {
  return request(baseUrl + '/onediscountclient/userList', {
    method: 'POST',
    body: params,
  });
}

export async function getAccountRecordList(params) {
  return request(baseUrl + '/onediscountclient/accountRecordList', {
    method: 'POST',
    body: params,
  });
}

export async function getWidthDrawOrderList(params) {
  return request(baseUrl + '/onediscountclient/withdrawOrderList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function getAutoRefundOrderList(params) {
  return request(baseUrl + '/onediscountclient/autoRefundOrderList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function confirmWithDrawOk(params) {
  return request(baseUrl + '/onediscountclient/confirmWithDrawOk', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function confirmWithDrawFail(params) {
  return request(baseUrl + '/onediscountclient/confirmWithDrawFail', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export function uploadToServer(params) {
  console.log('upload to server...');
  return request('/picture/upload', {
    method: 'POST',
    body: params,
  });
}

export async function getProductList(params) {
  return request(baseUrl + '/onediscountgame/productList', {
    method: 'POST',
    body: params,
  });
}

export async function queryTags() {
  return request(baseUrl + '/tags');
}

export async function queryBasicProfile() {
  return request(baseUrl + '/profile/basic');
}

export async function queryAdvancedProfile() {
  return request(baseUrl + '/profile/advanced');
}

export async function queryFakeList(params) {
  return request(baseUrl + `/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request(baseUrl + '/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request(baseUrl + '/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request(baseUrl + '/notices');
}

export async function analysisTotle(param) {
  return request(baseUrl + '/onediscountclient/userAmount', {
    method: 'POST',
    body: params,
  });
}
