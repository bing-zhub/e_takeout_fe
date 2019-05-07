import request from '@/utils/request'

export function addProduct(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

export function getProducts() {
  return request({
    url: '/product/list',
    method: 'get'
  })
}

export function updateProduct(data) {
  return request({
    url: '/product/update',
    method: 'post',
    data
  })
}

export function deleteProduct(id) {
  return request({
    url: '/product/delete',
    method: 'post',
    data: {
      id
    }
  })
}
