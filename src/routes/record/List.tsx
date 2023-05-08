import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  SwapHoriz,
  ArrowRight,
} from '@mui/icons-material'
import dayjs from 'dayjs'
import * as consts from '@/common/consts'
import { formatAmount } from '@/common/utils'
import * as service from '@/services/record'
import Nav from '@/components/RecordListNav'

export default () => {
  const [data, setData] = useState<service.RecordItem[]>([])

  useEffect(() => {
    service.getRecordList().then(payload => {
      setData(payload.data)
    })
  }, [])

  function getIcon(recordType: number) {
    if (recordType === consts.RECORD_TYPE_EXPENSE) return <UploadIcon />
    if (recordType === consts.RECORD_TYPE_INCOME) return <DownloadIcon />
    if (recordType === consts.RECORD_TYPE_TRANSFER) return <SwapHoriz />
  }

  function getPrimaryText(item: service.RecordItem) {
    if (item.record_type === consts.RECORD_TYPE_TRANSFER) {
      return (
        <Typography display="flex">
          {item.account_name}
          <ArrowRight />
          {item.target_account_name}
        </Typography>
      )
    }
    return item.account_name
  }

  function getSecondaryText(item: service.RecordItem) {
    const time = dayjs(item.record_time).format('MMM D HH:mm')
    return item.remark ? `${time} - ${item.remark}` : time
  }

  return (
    <Box>
      <Nav />
      <List>
        {data.map(item => (
          <ListItem
            key={item.id}
            disablePadding
            secondaryAction={formatAmount(item.amount)}
          >
            <ListItemButton component={Link} to={{ pathname: '/record/edit', search: `id=${item.id}` }}>
              <ListItemAvatar><Avatar>{getIcon(item.record_type)}</Avatar></ListItemAvatar>
              <ListItemText primary={getPrimaryText(item)} secondary={getSecondaryText(item)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
