import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import dayjs from 'dayjs'
import * as consts from '@/common/consts'
import { formatAmount, formatAmountTick } from '@/common/utils'
import * as chartService from '@/services/chart'

function formatMonth(value: any, format: string) {
  return dayjs(String(value), 'YYYYMM').format(format)
}

type Props = chartService.ExpenseIncomeChartResponse

export default (props: Props) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={props.data}>
        <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
        <YAxis tickFormatter={formatAmountTick} width={45} />
        {props.categories.map((category, i) => (
          <Bar
            key={category.id}
            dataKey={`category_${category.id}`}
            name={category.name}
            fill={consts.COLORS10[i % consts.COLORS10.length]}
            stackId="amount"
          />
        ))}
        <Legend />
        <Tooltip
          formatter={value => formatAmount(_.toNumber(value))}
          labelFormatter={value => formatMonth(value, 'MMM YYYY')}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
