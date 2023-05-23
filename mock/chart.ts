import { MockMethod } from 'vite-plugin-mock'

function getCategoryChart() {
  const data = [
    { category_id: 1, category_name: 'Food', amount: 1000, percent: 0.6536 },
    { category_id: 2, category_name: 'Drink', amount: 500, percent: 0.3268 },
    { category_id: 3, category_name: 'Telecom', amount: 30, percent: 0.0196 },
  ]
  return { data }
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
