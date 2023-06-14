import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import * as chartService from '@/services/chart'
import NetCapital from './NetCapital'
import ExpenseIncomeChart from './ExpenseIncomeChart'

interface Props {
  year: string
}

export default (props: Props) => {
  const [data, setData] = useState<chartService.NetCapitalChartItem[]>([])

  useEffect(() => {
    chartService.getNetCapitalChart(props.year).then(setData)
  }, [props.year])

  const emptyPayload = () => ({ categories: [], data: [] })
  const [expense, setExpense] = useState<chartService.ExpenseIncomeChartResponse>(emptyPayload())
  const [income, setIncome] = useState<chartService.ExpenseIncomeChartResponse>(emptyPayload())

  useEffect(() => {
    chartService.getExpenseChart(props.year).then(setExpense)
    chartService.getIncomeChart(props.year).then(setIncome)
  }, [props.year])

  return (
    <Stack px={2} py={3} spacing={3}>
      <NetCapital data={data} />
      <ExpenseIncomeChart {...expense} />
      <ExpenseIncomeChart {...income} />
    </Stack>
  )
}
