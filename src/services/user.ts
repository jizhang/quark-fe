import { post } from '@/common/request'

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
