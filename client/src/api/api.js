const BASEURL = '/api/'
const frontendURL = 'http://192.168.239.216:3000'
const natURL = 'http://shaoping.natapp1.cc'
const URL = {
  // http
  getSeller: BASEURL + 'seller',
  createOrder: BASEURL + 'consumer/order/create',
  getProducts: BASEURL + 'consumer/product/list',
  getOrderDetail: BASEURL + 'consumer/order/detail',
  cancelOrder: BASEURL + 'consumer/order/cancel',
  getOrderList: BASEURL + 'sell/buyer/order/list',

  // href
  wechatPayUrl: natURL + '/pay/create',
  sellUrl: frontendURL,
  openidUrl: natURL + '/wechat/authorize'
  // goodsApi: 'http://10.67.44.6:8080/consumer/product/list'
}

export default URL
