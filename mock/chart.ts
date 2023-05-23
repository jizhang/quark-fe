import { MockMethod } from 'vite-plugin-mock'

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

function getMinDate() {
  return {
    min_date: 20230101,
  }
}

export default [
  {
    url: '/api/chart/category',
    response: getCategoryChart,
  },
  {
    url: '/api/chart/min-date',
    response: getMinDate,
  },
] as MockMethod[]
