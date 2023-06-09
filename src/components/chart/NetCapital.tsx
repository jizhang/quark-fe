import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
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

  return (
    <Box px={2} py={3}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="month" tickFormatter={value => formatMonth(value, 'MMM')} />
          <YAxis tickFormatter={formatYAxisTick} width={45} />
          <Bar dataKey="amount" fill="#757de8" name="Net capital" />
          <Tooltip
            formatter={value => formatAmount(_.toNumber(value))}
            labelFormatter={value => formatMonth(value, 'MMM YYYY')}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
