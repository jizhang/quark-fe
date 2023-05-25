import { get } from '@/common/request'

export async function getMinDate(): Promise<number> {
  const payload = await get('/api/chart/min-date')
  return payload.min_date
}

export interface ChartItem {
  id: number
  name: string
  amount: string
  percent: number
}

export interface ChartGroup {
  id: number
  name: string
  amount: string
  categories: ChartItem[]
}

export async function getCategoryChart(month: string): Promise<{ groups: ChartGroup[] }> {
  return get('/api/chart/category', { month })
}

export interface InvestmentChart {
  total: string
  accounts: ChartItem[]
}

export async function getInvestmentChart(month: string): Promise<InvestmentChart> {
  return get('/api/chart/investment', { month })
}
