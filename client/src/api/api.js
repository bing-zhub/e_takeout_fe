const BASEURL = '/api/'
const frontendURL = 'http://eyao.bingware.cn'
// const natURL = 'http://shaoping.natapp1.cc'
const URL = {
  // http
  getSeller: BASEURL + 'seller/info',
  createOrder: BASEURL + 'consumer/order/create',
  getProducts: BASEURL + 'consumer/product/list',
  getOrderDetail: BASEURL + 'consumer/order/detail',
  cancelOrder: BASEURL + 'consumer/order/cancel',
  getOrderList: BASEURL + 'sell/buyer/order/list',

  // href
  wechatPayUrl: BASEURL + '/pay/create',
  sellUrl: frontendURL,
  openidUrl: BASEURL + '/wechat/authorize'
}

export default URL
