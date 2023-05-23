import { get } from '@/common/request'

export interface ChartGroup {
  id: number
  name: string
  amount: string
  categories: {
    id: number
    name: string
    amount: string
    percent: number
  }[]
}

export async function getCategoryChart(month: string): Promise<{ groups: ChartGroup[] }> {
  return get('/api/chart/category', { month })
}

export async function getMinDate(): Promise<number> {
  const payload = await get('/api/chart/min-date')
  return payload.min_date
}
