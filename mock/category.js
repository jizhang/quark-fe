const sendJson = require('send-data/json')

function getCategoryList(req, res) {
  sendJson(req, res, {
    data: [
      { id: 1, name: 'Meal', type: 1 },
      { id: 2, name: 'Snack', type: 1 },
      { id: 3, name: 'Mobile', type: 1 },
      { id: 4, name: 'Salary', type: 2 },
      { id: 5, name: 'Investment', type: 2 },
    ],
  })
}

module.exports = {
  'GET /api/category/list': getCategoryList,
}
