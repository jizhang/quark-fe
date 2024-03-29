const sendJson = require('send-data/json')
const _ = require('lodash')

function randomDecimal(min, max) {
  return String(_.round(_.random(min, max, true), 2))
}

function getAccountList(req, res) {
  const data = [
    { id: 1, name: 'Cash', is_hidden: false, type: 1, balance: randomDecimal(100, 200) },
    { id: 2, name: 'CMB', is_hidden: false, type: 1, balance: randomDecimal(10000, 20000) },
    { id: 3, name: 'Alipay', is_hidden: false, type: 1, balance: randomDecimal(50000, 100000) },
    { id: 4, name: 'CMB credit card', is_hidden: false, type: 2, balance: randomDecimal(-20, -10) },
    { id: 5, name: 'Home loan', is_hidden: false, type: 2, balance: randomDecimal(-50000, -10000) },
    { id: 6, name: 'Hidden liability', is_hidden: true, type: 2, balance: randomDecimal(-20, -10) },
  ]
  _.times(20, i => {
    data.push({
      id: 21 + i,
      name: 'Account ' + (21 + i),
      is_hidden: false,
      type: 2,
      balance: randomDecimal(-2000, -1000),
    })
  })
  sendJson(req, res, { data })
}

function getAccount(req, res) {
  sendJson(req, res, {
    account: {
      id: 1,
      name: 'Cash',
      is_hidden: false,
      type: 1,
      initial_balance: '1234.56',
    },
  })
}

function saveAccount(req, res) {
  sendJson(req, res, {
    id: 1,
  })
}

function deleteAccount(req, res) {
  sendJson(req, res, {
    id: 1,
  })
}

function moveAccount(req, res) {
  sendJson(req, res, 'ok')
}

module.exports = {
  'GET /api/account/list': getAccountList,
  'GET /api/account/get': getAccount,
  'POST /api/account/save': saveAccount,
  'POST /api/account/delete': deleteAccount,
  'POST /api/account/move': moveAccount,
}
