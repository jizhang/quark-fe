import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import dayjs from 'dayjs'
import * as consts from '@/common/consts'
import { formatAmount, formatAmountTick } from '@/common/utils'
import * as chartService from '@/services/chart'

function formatMonth(value: any, format: string) {
  return dayjs(String(value), 'YYYYMM').format(format)
}

interface Props {
  year: string
}

export default (props: Props) => {
  const [data, setData] = useState<chartService.ExpenseIncomeChartItem[]>([])

  useEffect(() => {
    chartService.getExpenseIncomeChart(props.year).then(setData)
  }, [props.year])

  const expenseData = [
    { month: '202304', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000), category_3: _.random(1000, 2000) },
    { month: '202305', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000) },
    { month: '202306', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000), category_3: _.random(1000, 2000) },
  ]

  const expenseCategories = [
    { key: 'category_1', name: 'Food', color: consts.COLORS10[0] },
    { key: 'category_2', name: 'Drink', color: consts.COLORS10[1] },
    { key: 'category_3', name: 'Clothes', color: consts.COLORS10[2] },
  ]

  const incomeData = [
    { month: '202304', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000) },
    { month: '202305', category_1: _.random(1000, 2000) },
    { month: '202306', category_1: _.random(1000, 2000), category_2: _.random(1000, 2000) },
  ]

  const incomeCategories = [
    { key: 'category_1', name: 'Salary', color: consts.COLORS10[0] },
    { key: 'category_2', name: 'Investment', color: consts.COLORS10[1] },
  ]

  return (
    <>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={expenseData}>
          <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
          <YAxis tickFormatter={formatAmountTick} width={45} />
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
          <YAxis tickFormatter={formatAmountTick} width={45} />
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
    </>
  )
}
