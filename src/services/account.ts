import { post } from '@/common/request'

export interface Account {
  name: string
  type: string
  balance: string
}

export async function saveAccount(account: Account) {
  return post('/account/save', account)
}
