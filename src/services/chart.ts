import { get } from '@/common/request'

export interface ChartItem {
  key: string
  value: number
  percent: number
}

export async function getCategoryChart(type: string, month: string): Promise<{ data: ChartItem[] }> {
  return get('/api/chart/category', { type, month })
}

export async function getMinDate(): Promise<number> {
  const payload = await get('/api/chart/min-date')
  return payload.min_date
}
