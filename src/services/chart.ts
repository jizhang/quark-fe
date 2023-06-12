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
  record_type: number
  category_id: number
  total: string
  accounts: ChartItem[]
}

export async function getInvestmentChart(month: string): Promise<InvestmentChart> {
  return get('/api/chart/investment', { month })
}

export interface NetCapitalChartItem {
  month: string
  amount: string
}

export async function getNetCapitalChart(year: string): Promise<NetCapitalChartItem[]> {
  const payload = await get('/api/chart/net-capital', { year })
  return payload.data
}

export interface ExpenseIncomeChartItem {
  month: string
  record_type: number
  category_id: number
  category_name: string
  amount: string
}

export async function getExpenseIncomeChart(year: string): Promise<ExpenseIncomeChartItem[]> {
  const payload = await get('/api/chart/expense-income', { year })
  return payload.data
}
