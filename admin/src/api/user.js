import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function listSeller() {
  return request({
    url: '/user/list',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function activateUser(username) {
  return request({
    url: '/user/active',
    method: 'post',
    data: { username }
  })
}

export function deactivateUser(username) {
  return request({
    url: '/user/deactive',
    method: 'post',
    data: { username }
  })
}
