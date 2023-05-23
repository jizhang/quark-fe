import { MockMethod } from 'vite-plugin-mock'

function getCategoryChart() {
  const data = [
    { key: 'Food', value: 1000, percent: 0.6536 },
    { key: 'Drink', value: 500, percent: 0.3268 },
    { key: 'Telecom', value: 30, percent: 0.0196 },
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
