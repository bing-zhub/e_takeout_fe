const BASEURL = '/api/'
const URL = {
  getSeller: BASEURL + 'seller',
  createOrder: BASEURL + 'consumer/order/create',
  getProducts: BASEURL + 'consumer/product/list',
  getOrderDetail: BASEURL + 'consumer/order/detail',
  cancelOrder: BASEURL + 'consumer/order/cancel',
  wechatPayUrl: 'http://shaoping.natapp1.cc/pay/create',
  sellUrl: 'http://192.168.234.31:3000',
  openidUrl: 'http://shaoping.natapp1.cc/wechat/authorize',
  goodsApi: 'http://127.0.0.1:8080/consumer/product/list'
}

export default URL
