import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceLine,
} from 'recharts'
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
  const hasNegative = _(props.data)
    .flatMap(item => {
      return _.map(props.categories, category => {
        return _.toNumber(item[`category_${category.id}`])
      })
    })
    .filter(amount => amount < 0)
    .some()

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={props.data} stackOffset="sign">
        <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
        <YAxis tickFormatter={formatAmountTick} width={45} />
        {hasNegative && <ReferenceLine y={0} />}
        <Tooltip
          trigger="click"
          formatter={value => formatAmount(_.toNumber(value))}
          labelFormatter={value => formatMonth(value, 'MMM YYYY')}
        />
        <Legend />
        {props.categories.map((category, i) => (
          <Bar
            key={category.id}
            dataKey={`category_${category.id}`}
            name={category.name}
            fill={consts.COLORS10[i % consts.COLORS10.length]}
            stackId="amount"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
