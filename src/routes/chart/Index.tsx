import { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material'
import _ from 'lodash'
import dayjs from 'dayjs'
import useQueryState from '@/common/use-query-state'
import * as chartService from '@/services/chart'
import SideMenu from '@/components/SideMenu'
import Category from '@/components/chart/Category'
import Investment from '@/components/chart/Investment'
import NetCapital from '@/components/chart/NetCapital'

const charts = [
  { type: 'category', name: 'Category', selector: 'month' },
  { type: 'investment', name: 'Investment', selector: 'month' },
  { type: 'net-capital', name: 'Net capital', selector: 'year' },
]

function getMonths(minDate: dayjs.Dayjs) {
  let current = minDate.startOf('month')
  const end = dayjs().endOf('month')
  const result = []
  while (current.isBefore(end)) {
    result.push({
      key: current.format('YYYYMM'),
      value: current.format('MMM YYYY'),
    })
    current = current.add(1, 'month')
  }
  return result
}

function getYears(minDate: dayjs.Dayjs) {
  let current = minDate.startOf('year')
  const end = dayjs().endOf('year')
  const result = []
  while (current.isBefore(end)) {
    const year = current.format('YYYY')
    result.push({ key: year, value: year })
    current = current.add(1, 'year')
  }
  return result
}

export default () => {
  const [minDate, setMinDate] = useState(dayjs())

  useEffect(() => {
    chartService.getMinDate().then(minDate => {
      setMinDate(dayjs(String(minDate)))
    })
  }, [])

  const [form, setForm] = useQueryState({
    type: 'category',
    month: dayjs().format('YYYYMM'),
    year: 'last-year',
  })

  const currentChart = _.find(charts, ['type', form.type])
  const selector = _.isUndefined(currentChart) ? 'month' : currentChart.selector

  function handleChangeType(event: SelectChangeEvent) {
    setForm({
      ...form,
      type: event.target.value,
    })
  }

  function handleChangeMonth(event: SelectChangeEvent) {
    setForm({
      ...form,
      month: event.target.value,
    })
  }

  function handleChangeYear(event: SelectChangeEvent) {
    setForm({
      ...form,
      year: event.target.value,
    })
  }

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <SideMenu />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Charts</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Stack direction="row" px={2} pt={3} spacing={2}>
        <FormControl size="small" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={form.type}
            label="Type"
            onChange={handleChangeType}
          >
            {charts.map(chart => (
              <MenuItem key={chart.type} value={chart.type}>{chart.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {selector === 'month' && (
          <FormControl size="small" fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={form.month}
              label="Month"
              onChange={handleChangeMonth}
            >
              {getMonths(minDate).map(item => (
                <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {selector === 'year' && (
          <FormControl size="small" fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={form.year}
              label="Year"
              onChange={handleChangeYear}
            >
              <MenuItem value="last-year">Last year</MenuItem>
              {getYears(minDate).map(item => (
                <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      {form.type === 'category' && (
        <Category month={form.month} />
      )}

      {form.type === 'investment' && (
        <Investment month={form.month} />
      )}

      {form.type === 'net-capital' && (
        <NetCapital year={form.year} />
      )}
    </Box>
  )
}
