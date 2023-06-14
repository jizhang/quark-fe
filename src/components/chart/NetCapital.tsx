import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import dayjs from 'dayjs'
import * as consts from '@/common/consts'
import { formatAmount, formatAmountTick } from '@/common/utils'
import * as chartService from '@/services/chart'
import ExpenseIncomeChart from './ExpenseIncomeChart'

function formatMonth(value: any, format: string) {
  return dayjs(String(value), 'YYYYMM').format(format)
}

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
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
          <YAxis tickFormatter={formatAmountTick} width={45} />
          <Bar dataKey="amount" fill={consts.COLORS10[0]} name="Net capital" />
          <Legend />
          <Tooltip
            trigger="click"
            formatter={value => formatAmount(_.toNumber(value))}
            labelFormatter={value => formatMonth(value, 'MMM YYYY')}
          />
        </BarChart>
      </ResponsiveContainer>

      <ExpenseIncomeChart {...expense} />
      <ExpenseIncomeChart {...income} />
    </Stack>
  )
}
