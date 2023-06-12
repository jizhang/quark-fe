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

export interface ExpenseIncomeChartResponse {
  categories: {
    id: number
    name: string
  }[]
  data: {
    month: string
    [key: string]: string
  }[]
}

export async function getExpenseChart(year: string): Promise<ExpenseIncomeChartResponse> {
  return get('/api/chart/expense', { year })
}

export async function getIncomeChart(year: string): Promise<ExpenseIncomeChartResponse> {
  return get('/api/chart/income', { year })
}
