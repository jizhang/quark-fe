import { get } from '@/common/request'

export interface Category {
  id: number
  type: number
  name: string
}

export async function getCategoryList(): Promise<{ data: Category[] }> {
  return get('/api/category/list')
}
