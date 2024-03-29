const sendJson = require('send-data/json')
const _ = require('lodash')
const dayjs = require('dayjs')

function getMinDate(req, res) {
  sendJson(req, res, {
    min_date: 20230101,
  })
}

function getCategoryChart(req, res) {
  const groups = [
    {
      id: 1,
      name: 'Expense',
      amount: '1800',
      categories: [
        { id: 1, name: 'Food', amount: '1000', percent: 0.6536 },
        { id: 2, name: 'Drink', amount: '500', percent: 0.3268 },
        { id: 3, name: 'Telecom', amount: '30', percent: 0.0196 },
      ],
    },
    {
      id: 2,
      name: 'Income',
      amount: '1600',
      categories: [
        { id: 4, name: 'Salary', amount: '2000', percent: 0.9524 },
        { id: 5, name: 'Gift', amount: '100', percent: 0.0476 },
        { id: 6, name: 'Investment', amount: '-500', percent: 0.0 },
      ],
    },
  ]
  sendJson(req, res, { groups })
}

function getInvestmentChart(req, res) {
  const accounts = [
    { id: 1, name: 'Alipay', amount: '2000', percent: 0.9524 },
    { id: 2, name: 'CMB', amount: '100', percent: 0.0476 },
    { id: 3, name: 'Snowball', amount: '-500', percent: 0.0 },
  ]
  const total = _(accounts).map('amount').map(_.toNumber).sum() + ''

  sendJson(req, res, {
    record_type: 2,
    category_id: 6,
    total,
    accounts,
  })
}

function getNetCapitalChart(req, res) {
  let current = dayjs().startOf('month').subtract(11, 'month')
  const end = dayjs().endOf('month')

  const data = []
  while (current.isBefore(end)) {
    data.push({
      month: current.format('YYYYMM'),
      amount: String(_.round(_.random(100_0000, 200_0000, true), 2)),
    })
    current = current.add(1, 'month')
  }

  sendJson(req, res, { data })
}

function makeCategoryTrendChart(categories, allowNegative = false) {
  const data = []

  let current = dayjs().startOf('month').subtract(11, 'month')
  const end = dayjs().endOf('month')

  while (current.isBefore(end)) {
    const item = {
      month: current.format('YYYYMM'),
    }

    _.forEach(categories, category => {
      const value = allowNegative ? _.random(-1000, 1000, true) : _.random(1000, 2000, true)
      item[`category_${category.id}`] = String(_.round(value, 2))
    })

    data.push(item)
    current = current.add(1, 'month')
  }

  return data
}

function getExpenseChart(req, res) {
  const categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Drink' },
    { id: 3, name: 'Clothes' },
  ]
  const data = makeCategoryTrendChart(categories)
  sendJson(req, res, { categories, data })
}

function getIncomeChart(req, res) {
  const categories = [
    { id: 4, name: 'Salary' },
    { id: 5, name: 'Investment' },
  ]
  const data = makeCategoryTrendChart(categories, true)
  sendJson(req, res, { categories, data })
}

function getInvestmentTrend(req, res) {
  const categories = [
    { id: 7, name: 'Alipay' },
    { id: 8, name: 'Snowball' },
    { id: 9, name: 'Stock' },
  ]
  const data = makeCategoryTrendChart(categories, true)
  sendJson(req, res, { categories, data })
}

module.exports = {
  'GET /api/chart/min-date': getMinDate,
  'GET /api/chart/category': getCategoryChart,
  'GET /api/chart/investment': getInvestmentChart,
  'GET /api/chart/net-capital': getNetCapitalChart,
  'GET /api/chart/expense': getExpenseChart,
  'GET /api/chart/income': getIncomeChart,
  'GET /api/chart/investment-trend': getInvestmentTrend,
}
