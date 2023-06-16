import _ from 'lodash'
import { MockMethod } from 'vite-plugin-mock'

function getAccountList() {
  const data = [
    { id: 1, name: 'Cash', is_hidden: false, type: 1, balance: _.random(100, 200, true) },
    { id: 2, name: 'CMB', is_hidden: false, type: 1, balance: _.random(500000, 800000, true) },
    { id: 3, name: 'Alipay', is_hidden: false, type: 1, balance: _.random(500000, 800000, true) },
    { id: 4, name: 'CMB credit card', is_hidden: false, type: 2, balance: -_.random(10, 20, true) },
    { id: 5, name: 'Home loan', is_hidden: false, type: 2, balance: -_.random(5000, 800000, true) },
    { id: 6, name: 'Hidden liability', is_hidden: true, type: 2, balance: -_.random(10, 20, true) },
  ]
  _.times(20, i => {
    data.push({
      id: 21 + i,
      name: 'Account ' + (21 + i),
      is_hidden: false,
      type: 2,
      balance: -_.random(1000, 2000, true),
    })
  })
  return { data }
}

function getAccount() {
  return {
    account: {
      id: 1,
      name: 'Cash',
      is_hidden: false,
      type: 1,
      initial_balance: 1234.56,
    },
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
  },
] as MockMethod[]
