import _ from 'lodash'
import dayjs from 'dayjs'
import { MockMethod } from 'vite-plugin-mock'

function getMinDate() {
  return {
    min_date: 20230101,
  }
}

function getCategoryChart() {
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
  return { groups }
}

function getInvestmentChart() {
  const accounts = [
    { id: 1, name: 'Alipay', amount: '2000', percent: 0.9524 },
    { id: 2, name: 'CMB', amount: '100', percent: 0.0476 },
    { id: 3, name: 'Snowball', amount: '-500', percent: 0.0 },
  ]
  const total = _(accounts).map('amount').map(_.toNumber).sum() + ''

  return {
    record_type: 2,
    category_id: 6,
    total,
    accounts,
  }
}

function getNetCapitalChart() {
  let current = dayjs().startOf('month').subtract(11, 'month')
  const end = dayjs().endOf('month')

  const data = [] as {
    month: string
    amount: string
  }[]

  while (current.isBefore(end)) {
    data.push({
      month: current.format('YYYYMM'),
      amount: String(_.round(_.random(100_0000, 200_0000, true), 2)),
    })
    current = current.add(1, 'month')
  }

  return { data }
}

function makeCategoryTrendChart(categories: { id: number }[]) {
  const data = [] as {
    month: string
    [key: string]: string
  }[]

  let current = dayjs().startOf('month').subtract(11, 'month')
  const end = dayjs().endOf('month')

  while (current.isBefore(end)) {
    const item = {
      month: current.format('YYYYMM'),
    }

    _.forEach(categories, category => {
      item[`category_${category.id}`] = String(_.round(_.random(1000, 2000, true), 2))
    })

    data.push(item)
    current = current.add(1, 'month')
  }

  return data
}

function getExpenseChart() {
  const categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Drink' },
    { id: 3, name: 'Clothes' },
  ]
  const data = makeCategoryTrendChart(categories)
  return { categories, data }
}

function getIncomeChart() {
  const categories = [
    { id: 4, name: 'Salary' },
    { id: 5, name: 'Investment' },
  ]
  const data = makeCategoryTrendChart(categories)
  return { categories, data }
}

export default [
  {
    url: '/api/chart/min-date',
    response: getMinDate,
  },
  {
    url: '/api/chart/category',
    response: getCategoryChart,
  },
  {
    url: '/api/chart/investment',
    response: getInvestmentChart,
  },
  {
    url: '/api/chart/net-capital',
    response: getNetCapitalChart,
  },
  {
    url: '/api/chart/expense',
    response: getExpenseChart,
  },
  {
    url: '/api/chart/income',
    response: getIncomeChart,
  },
] as MockMethod[]
