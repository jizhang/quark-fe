const sendJson = require('send-data/json')
const url = require('url')
const qs = require('qs')
const dayjs = require('dayjs')

const parseQuery = req => qs.parse(url.parse(req.url).query)

function getRecordList(req, res) {
  const query = parseQuery(req)
  const year = query.year ?? dayjs().format('YYYY')
  const data = [
    {
      id: parseInt(year) * 100 + 3,
      record_type: 1,
      category_name: 'Mobile',
      account_name: 'Alipay',
      record_time: `${year}-06-05 08:17:00`,
      amount: '-10.9',
      remark: 'chess cracker scald free ink bang verse redundant young glistening',
    },
    {
      id: parseInt(year) * 100 + 2,
      record_type: 2,
      category_name: 'Salary',
      account_name: 'CMB',
      record_time: `${year}-05-04 17:13:00`,
      amount: '12345.67',
      remark: 'Remark 2',
    },
    {
      id: parseInt(year) * 100 + 1,
      record_type: 3,
      account_name: 'CMB',
      target_account_name: 'Alipay',
      record_time: `${year}-05-03 06:32:00`,
      amount: '1000',
      remark: '',
    },
  ]
  sendJson(req, res, { data })
}

function getRecord(req, res) {
  sendJson(req, res, {
    id: 1,
    record_type: 1,
    category_id: 1,
    account_id: 3,
    record_time: '2023-05-05 08:17:00',
    amount: '10.9',
    remark: 'Remark 1',
  })
}

function saveRecord(req, res) {
  sendJson(req, res, {
    id: 1,
  })
}

function deleteRecord(req, res) {
  sendJson(req, res, {
    id: 1,
  })
}

module.exports = {
  'GET /api/record/list': getRecordList,
  'GET /api/record/get': getRecord,
  'POST /api/record/save': saveRecord,
  'POST /api/record/delete': deleteRecord,
}
