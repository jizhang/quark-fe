import React, { useState, useEffect } from 'react'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@mui/material'
import * as chartService from '@/services/chart'
import TitleAmount from '@/components/TitleAmount'
import Progress from './Progress'

interface Props {
  month: string
}

export default (props: Props) => {
  const [data, setData] = useState<chartService.InvestmentChart>({
    total: '0',
    accounts: [],
  })

  useEffect(() => {
    chartService.getInvestmentChart(props.month).then(payload => {
      setData(payload)
    })
  }, [props.month])

  return (
    <List>
      <ListSubheader>
        <TitleAmount title="Total" amount={data.total} />
      </ListSubheader>
      {data.accounts.map(item => (
        <ListItem key={item.id}>
          <ListItemText secondary={<Progress percent={item.percent} />}>
            <TitleAmount title={item.name} amount={item.amount} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}
