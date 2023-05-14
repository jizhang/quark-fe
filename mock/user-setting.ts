import { MockMethod } from 'vite-plugin-mock'

function getUserSetting() {
  return {
    default_expense_account_id: 1,
  }
}

function saveUserSetting() {
  return {}
}

export default [
  {
    url: '/api/user-setting/get',
    response: getUserSetting,
  },
  {
    url: '/api/user-setting/save',
    response: saveUserSetting,
  }
] as MockMethod[]
