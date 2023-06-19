import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import * as chartService from '@/services/chart'
import ExpenseIncomeChart from './ExpenseIncomeChart'
import _ from 'lodash'

type Payload = chartService.ExpenseIncomeChartResponse

function getDefaultPayload(): Payload {
  return {
    categories: [],
    data: [],
  }
}

interface Props {
  year: string
}

export default (props: Props) => {
  const [netCapital, setNetCapital] = useState(getDefaultPayload())
  const [expense, setExpense] = useState(getDefaultPayload())
  const [income, setIncome] = useState(getDefaultPayload())
  const [investment, setInvestment] = useState(getDefaultPayload())

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
    chartService.getInvestmentTrend(props.year).then(setInvestment)
  }, [props.year])

  const charts = [
    { name: 'Net capital', props: netCapital },
    { name: 'Expense', props: expense },
    { name: 'Income', props: income },
    { name: 'Investment', props: investment },
  ]

  return (
    <Stack px={2} py={3} spacing={3}>
      {charts.map(chart => (
        <ExpenseIncomeChart key={chart.name} {...chart.props} />
      ))}
    </Stack>
  )
}
