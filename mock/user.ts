import { MockMethod } from 'vite-plugin-mock'

function login() {
  return {
    id: 1,
    username: 'test',
  }
}

function getUserSetting() {
  return {
    default_account_id: 1,
  }
}

function saveUserSetting() {
  return {}
}

export default [
  {
    url: '/api/user/login',
    response: login,
  },
  {
    url: '/api/user/setting/get',
    response: getUserSetting,
  },
  {
    url: '/api/user/setting/save',
    response: saveUserSetting,
  },
] as MockMethod[]
