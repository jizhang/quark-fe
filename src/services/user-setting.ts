import { get, post } from '@/common/request'

interface UserSetting {
  default_expense_account_id: number
}

export async function getUserSetting(): Promise<UserSetting> {
  return get('/api/user-setting/get')
}

export async function saveUserSetting(form: UserSetting): Promise<{}> {
  return post('/api/user-setting/save', form)
}
