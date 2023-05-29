import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import qs from 'qs'
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

  function makeLinkTo(group: chartService.ChartGroup, item: chartService.ChartItem) {
    const search = {
      record_type: group.id,
      category_id: item.id,
    }

    return {
      pathname: '/record/list',
      search: qs.stringify(search),
    }
  }

  return (
    <List>
      {groups.map(group => (
        <React.Fragment key={group.id}>
          <ListSubheader>
            <TitleAmount title={group.name} amount={group.amount} />
          </ListSubheader>
          {group.categories.map(item => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton component={Link} to={makeLinkTo(group, item)}>
                <ListItemText secondary={<Progress percent={item.percent} />}>
                  <TitleAmount title={item.name} amount={item.amount} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}
