import { get, post } from '@/common/request'

export interface Account {
  id: number
  name: string
  type: number
  initial_balance: number,
  balance: number
}

interface AccountListResponse {
  data: Account[]
}

export async function getAccount(id: number): Promise<{ account: Account }> {
  return get('/api/account/get', { id })
}

export async function getAccountList(): Promise<AccountListResponse> {
  return get('/api/account/list')
}

export interface AccountForm {
  id?: string
  name: string
  type: string
  initial_balance: string
}

export async function saveAccount(account: AccountForm) {
  return post('/api/account/save', account)
}
