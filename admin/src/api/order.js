import request from '@/utils/request'

export function getOrders(data) {
  return request({
    url: '/consumer/order/list',
    method: 'post',
    data
  })
}

export function cancelOrder(data) {
  return request({
    url: '/consumer/order/cancel',
    method: 'post',
    data
  })
}

export function finishOrder(data) {
  return request({
    url: '/consumer/order/finish',
    method: 'post',
    data
  })
}
