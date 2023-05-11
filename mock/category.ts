import { MockMethod } from 'vite-plugin-mock'

function getCategoryList() {
  return {
    data: [
      { id: 1, name: 'Meal', type: 1 },
      { id: 2, name: 'Snack', type: 1 },
      { id: 3, name: 'Mobile', type: 1 },
      { id: 4, name: 'Salary', type: 2 },
      { id: 5, name: 'Investment', type: 2 },
    ]
  }
}

export default [
  {
    url: '/api/category/list',
    response: getCategoryList,
  },
] as MockMethod[]
