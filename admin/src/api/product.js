import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: '/seller/product/create',
    method: 'post',
    data
  })
}

export function getProducts() {
  return request({
    url: '/seller/product/list',
    method: 'get'
  })
}

export function updateProduct(data) {
  return request({
    url: '/seller/product/update',
    method: 'post',
    data
  })
}

export function deleteProduct(data) {
  return request({
    url: '/seller/product/delete',
    method: 'post',
    data
  })
}
