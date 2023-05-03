import _ from 'lodash'
import { MockMethod } from 'vite-plugin-mock'

function getAccountList() {
  return {
    data: [
      { id: 1, name: 'Cash', type: 1, balance: _.random(100, 200, true) },
      { id: 2, name: 'CMB', type: 1, balance: _.random(500000, 800000, true) },
      { id: 3, name: 'Alipay', type: 1, balance: _.random(500000, 800000, true) },
      { id: 4, name: 'CMB credit card', type: 2, balance: _.random(10, 20, true) },
      { id: 5, name: 'Home loan', type: 2, balance: _.random(500000, 800000, true) },
    ]
  }
}

function getAccount() {
  return {
    account: {
      id: 1,
      name: 'Cash',
      type: 1,
      initial_balance: 1234.56,
    }
  }
}

function saveAccount() {
  return {
    id: 1,
  }
}

function deleteAccount() {
  return {
    id: 1,
  }
}

export default [
  {
    url: '/api/account/list',
    response: getAccountList,
  },
  {
    url: '/api/account/get',
    response: getAccount,
  },
  {
    url: '/api/account/save',
    statusCode: 200,
    response: saveAccount,
  },
  {
    url: '/api/account/delete',
    response: deleteAccount,
  }
] as MockMethod[]
