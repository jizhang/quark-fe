import { MockMethod } from 'vite-plugin-mock'

function saveAccount() {
  return {
    id: 1,
  }
}

export default [
  {
    url: '/api/account/save',
    statusCode: 200,
    response: saveAccount,
  },
] as MockMethod[]
