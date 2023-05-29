import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import _ from 'lodash'
import qs from 'qs'
import * as consts from '@/common/consts'
import * as chartService from '@/services/chart'
import TitleAmount from '@/components/TitleAmount'
import Progress from './Progress'

interface Props {
  month: string
}

export default (props: Props) => {
  const [data, setData] = useState<chartService.InvestmentChart>({
    record_type: consts.RECORD_TYPE_INCOME,
    category_id: 0,
    total: '0',
    accounts: [],
  })

  useEffect(() => {
    chartService.getInvestmentChart(props.month).then(payload => {
      setData(payload)
    })
  }, [props.month])

  function makeLinkTo(item: chartService.ChartItem) {
    const search = {
      record_type: data.record_type,
      category_id: data.category_id,
      account_id: item.id,
    }

    return {
      pathname: '/record/list',
      search: qs.stringify(search),
    }
  }

  return (
    <List>
      <ListSubheader>
        <TitleAmount title="Total" amount={data.total} />
      </ListSubheader>
      {data.accounts.map(item => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton component={Link} to={makeLinkTo(item)}>
            <ListItemText secondary={<Progress percent={item.percent} />}>
              <TitleAmount title={item.name} amount={item.amount} />
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
