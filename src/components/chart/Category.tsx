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
  const [groups, setGroups] = useState<chartService.ChartGroup[]>([])

  useEffect(() => {
    chartService.getCategoryChart(props.month).then(payload => {
      setGroups(payload.groups)
    })
  }, [props.month])

  return (
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
  )
}
