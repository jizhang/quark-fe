const sendJson = require('send-data/json')

function login(req, res) {
  sendJson(req, res, {
    id: 1,
    username: 'test',
  })
}

function getUserSetting(req, res) {
  sendJson(req, res, {
    default_account_id: 1,
  })
}

function saveUserSetting(req, res) {
  sendJson(req, res, {})
}

module.exports = {
  'POST /api/user/login': login,
  'GET /api/user/setting/get': getUserSetting,
  'POST /api/user/setting/save': saveUserSetting,
}
