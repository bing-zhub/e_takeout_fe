import request from '@/utils/request'

export function getOrders(data) {
  return request({
    url: '/consumer/order/list',
    method: 'get',
    data
  })
}
