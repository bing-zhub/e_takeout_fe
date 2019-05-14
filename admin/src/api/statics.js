import request from '@/utils/request'

export function getCompleteOrderNum() {
  return request({
    url: '/static//week/complete',
    method: 'get'
  })
}

export function getAverageConsumption() {
  return request({
    url: '/static//week/consumption',
    method: 'get'
  })
}

export function getIncome() {
  return request({
    url: '/static/week/income',
    method: 'get'
  })
}

export function getProductCount() {
  return request({
    url: '/static/week/count',
    method: 'get'
  })
}

export function getTotal() {
  return request({
    url: '/static/total',
    method: 'get'
  })
}
