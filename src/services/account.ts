import { get, post } from '@/common/request'

export interface Account {
  id: number
  name: string
  is_hidden: boolean
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

export async function getAccount(id: number): Promise<Account> {
  const payload = await get('/api/account/get', { id })
  return payload.account
}

export interface AccountForm {
  id?: string
  name: string
  is_hidden: boolean
  type: string
  initial_balance: string
}

export async function saveAccount(account: AccountForm): Promise<{ id: number }> {
  return post('/api/account/save', account)
}

export async function deleteAccount(id: number) {
  return post('/api/account/delete', { id })
}
