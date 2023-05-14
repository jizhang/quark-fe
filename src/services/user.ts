import { get, post } from '@/common/request'

interface CurrentUser {
  id: number
  username: string
}

interface LoginForm {
  username: string
  password: string
  remember_me: string
}

export async function login(form: LoginForm): Promise<CurrentUser> {
  return post('/api/user/login', form)
}

interface UserSetting {
  default_expense_account_id: number
}

export async function getUserSetting(): Promise<UserSetting> {
  return get('/api/user/setting/get')
}

export async function saveUserSetting(form: UserSetting): Promise<{}> {
  return post('/api/user/setting/save', form)
}
