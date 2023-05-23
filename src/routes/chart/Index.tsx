import React, { useState } from 'react'
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
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material'
import _ from 'lodash'
import dayjs from 'dayjs'
import SideMenu from '@/components/SideMenu'
import TitleAmount from '@/components/TitleAmount'

export default () => {
  const data = [
    { key: 'Food', value: 1000, percent: 0.6536 },
    { key: 'Drink', value: 500, percent: 0.3268 },
    { key: 'Telecom', value: 30, percent: 0.0196 },
  ]

  const months = [
    { key: '202301', value: 'Jan 2023' },
    { key: '202302', value: 'Feb 2023' },
    { key: '202303', value: 'Mar 2023' },
    { key: '202304', value: 'Apr 2023' },
    { key: '202305', value: 'May 2023' },
  ]

  const [form, setForm] = useState({
    type: 'expense',
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

  function getProgress(percent: number) {
    const value = _.round(percent * 100)
    return (
      <LinearProgress variant="determinate" value={value} />
    )
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
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Month</InputLabel>
          <Select
            value={form.month}
            label="Month"
            onChange={handleChangeMonth}
          >
            {months.map(item => (
              <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <List>
        {data.map(item => (
          <ListItem key={item.key}>
            <ListItemText secondary={getProgress(item.percent)}>
              <TitleAmount title={item.key} amount={item.value} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
