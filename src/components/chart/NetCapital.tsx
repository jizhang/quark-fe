import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import dayjs from 'dayjs'
import { formatAmount } from '@/common/utils'
import * as chartService from '@/services/chart'

interface Props {
  year: string
}

function formatYAxisTick(value: any) {
  if (value >= 1000_000_000) return _.round(value / 1000_000_000, 1) + 'b'
  if (value >= 1000_000) return _.round(value / 1000_000, 1) + 'm'
  if (value >= 1000) return _.round(value / 1000, 1) + 'k'
  return value
}

function formatMonth(value: any, format: string) {
  return dayjs(String(value), 'YYYYMM').format(format)
}

export default (props: Props) => {
  const [data, setData] = useState<chartService.NetCapitalChartItem[]>([])

  useEffect(() => {
    chartService.getNetCapitalChart(props.year).then(setData)
  }, [props.year])

  const expenseData = [
    { month: '202304', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000), category_3: _.random(1000, 2000) },
    { month: '202305', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000) },
    { month: '202306', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000), category_3: _.random(1000, 2000) },
  ]

  const expenseCategories = [
    { key: 'category_1', name: 'Food', color: '#8884d8' },
    { key: 'category_2', name: 'Drink', color: '#82ca9d' },
    { key: 'category_3', name: 'Clothes', color: '#ffc658' },
  ]

  const incomeData = [
    { month: '202304', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000) },
    { month: '202305', category_1: _.random(1000, 2000) },
    { month: '202306', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000) },
  ]

  const incomeCategories = [
    { key: 'category_1', name: 'Salary', color: '#8884d8' },
    { key: 'category_2', name: 'Investment', color: '#82ca9d' },
  ]

  return (
    <Stack px={2} py={3} spacing={3}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
          <YAxis tickFormatter={formatYAxisTick} width={45} />
          <Bar dataKey="amount" fill="#757de8" name="Net capital" />
          <Legend />
          <Tooltip
            formatter={value => formatAmount(_.toNumber(value))}
            labelFormatter={value => formatMonth(value, 'MMM YYYY')}
          />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={expenseData}>
          <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
          <YAxis tickFormatter={formatYAxisTick} width={45} />
          {expenseCategories.map(item => (
            <Bar
              key={item.key}
              dataKey={item.key}
              name={item.name}
              fill={item.color}
              stackId="expense"
            />
          ))}
          <Legend />
          <Tooltip
            formatter={value => formatAmount(_.toNumber(value))}
            labelFormatter={value => formatMonth(value, 'MMM YYYY')}
          />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={incomeData}>
          <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
          <YAxis tickFormatter={formatYAxisTick} width={45} />
          {incomeCategories.map(item => (
            <Bar
              key={item.key}
              dataKey={item.key}
              name={item.name}
              fill={item.color}
              stackId="income"
            />
          ))}
          <Legend />
          <Tooltip
            formatter={value => formatAmount(_.toNumber(value))}
            labelFormatter={value => formatMonth(value, 'MMM YYYY')}
          />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  )
}
