import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts'
import * as consts from '@/common/consts'
import { formatAmount, formatAmountTick, formatMonth } from '@/common/utils'
import type { NetCapitalChartItem } from '@/services/chart'

interface Props {
  data: NetCapitalChartItem[]
}

export default (props: Props) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={props.data}>
        <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
        <YAxis tickFormatter={formatAmountTick} width={45} />
        <Tooltip
          trigger="click"
          formatter={value => formatAmount(_.toNumber(value))}
          labelFormatter={value => formatMonth(value, 'MMM YYYY')}
        />
        <Legend />
        <Bar dataKey="amount" fill={consts.COLORS10[0]} name="Net capital" />
      </BarChart>
    </ResponsiveContainer>
  )
}
