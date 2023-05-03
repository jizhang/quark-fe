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

export async function getAccountList(): Promise<AccountListResponse> {
  return get('/api/account/list')
}

export async function getAccount(id: number): Promise<{ account: Account }> {
  return get('/api/account/get', { id })
}

export interface AccountForm {
  id?: string
  name: string
  type: string
  initial_balance: string
}

export async function saveAccount(account: AccountForm): Promise<{ id: number }> {
  return post('/api/account/save', account)
}

export async function deleteAccount(id: number) {
  return post('/api/account/delete', { id })
}
