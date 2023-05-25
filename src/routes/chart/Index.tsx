import React, { useState, useEffect } from 'react'
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
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@mui/material'
import _ from 'lodash'
import dayjs from 'dayjs'
import * as chartService from '@/services/chart'
import SideMenu from '@/components/SideMenu'
import TitleAmount from '@/components/TitleAmount'
import Progress from '@/components/chart/Progress'
import Investment from '@/components/chart/Investment'

export default () => {
  const [minDate, setMinDate] = useState(dayjs())

  useEffect(() => {
    chartService.getMinDate().then(minDate => {
      setMinDate(dayjs(String(minDate)))
    })
  }, [])

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

  const [form, setForm] = useState({
    type: 'category',
    month: dayjs().format('YYYYMM'),
  })

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

  const [groups, setGroups] = useState<chartService.ChartGroup[]>([])

  useEffect(() => {
    chartService.getCategoryChart(form.month).then(payload => {
      setGroups(payload.groups)
    })
  }, [form.type, form.month])

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
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="investment">Investment</MenuItem>
          </Select>
        </FormControl>
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
      </Stack>

      {form.type === 'category' && (
        <List>
          {groups.map(group => (
            <React.Fragment key={group.id}>
              <ListSubheader>
                <TitleAmount title={group.name} amount={group.amount} />
              </ListSubheader>
              {group.categories.map(item => (
                <ListItem key={item.id}>
                  <ListItemText secondary={<Progress percent={item.percent} />}>
                    <TitleAmount title={item.name} amount={item.amount} />
                  </ListItemText>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      )}

      {form.type === 'investment' && (
        <Investment month={form.month} />
      )}
    </Box>
  )
}