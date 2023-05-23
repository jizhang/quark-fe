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
import SideMenu from '@/components/SideMenu'
import TitleAmount from '@/components/TitleAmount'

export default () => {
  const data = [
    { key: 'Food', value: 1000, percent: 0.6536 },
    { key: 'Drink', value: 500, percent: 0.3268 },
    { key: 'Telecom', value: 30, percent: 0.0196 },
  ]

  const [form, setForm] = useState({
    type: 'expense',
  })

  function handleChangeType(event: SelectChangeEvent) {
    setForm({
      ...form,
      type: event.target.value,
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

      <Stack py={3}>
        <Stack px={2} spacing={2}>
          <FormControl>
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
      </Stack>
    </Box>
  )
}
