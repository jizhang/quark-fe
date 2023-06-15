import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import * as chartService from '@/services/chart'
import ExpenseIncomeChart from './ExpenseIncomeChart'
import _ from 'lodash'

interface Props {
  year: string
}

export default (props: Props) => {
  const emptyPayload = () => ({ categories: [], data: [] })
  const [netCapital, setNetCapital] = useState<chartService.ExpenseIncomeChartResponse>(emptyPayload())
  const [expense, setExpense] = useState<chartService.ExpenseIncomeChartResponse>(emptyPayload())
  const [income, setIncome] = useState<chartService.ExpenseIncomeChartResponse>(emptyPayload())

  useEffect(() => {
    chartService.getNetCapitalChart(props.year).then(data => {
      const categoryId = 1
      const transformed = _.map(data, item => {
        return {
          month: item.month,
          [`category_${categoryId}`]: item.amount,
        }
      })

      setNetCapital({
        categories: [{ id: categoryId, name: 'Net capital' }],
        data: transformed,
      })
    })

    chartService.getExpenseChart(props.year).then(setExpense)
    chartService.getIncomeChart(props.year).then(setIncome)
  }, [props.year])

  const charts = [
    { name: 'Net capital', props: netCapital },
    { name: 'Expense', props: expense },
    { name: 'Income', props: income },
  ]

  return (
    <Stack px={2} py={3} spacing={3}>
      {charts.map(chart => (
        <ExpenseIncomeChart key={chart.name} {...chart.props} />
      ))}
    </Stack>
  )
}
