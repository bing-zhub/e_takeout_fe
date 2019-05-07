import request from '@/utils/request'

export function getCategories(sellerId) {
  return request({
    url: '/category/list',
    method: 'get',
    data: {
      sellerId
    }
  })
}

export function deleteCategory(data) {
  return request({
    url: '/category/delete',
    method: 'post',
    data
  })
}

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}

export function importCategory(data) {
  return request({
    url: '/category/import',
    method: 'post',
    data
  })
}
