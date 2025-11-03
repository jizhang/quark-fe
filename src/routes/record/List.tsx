import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Avatar,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  SwapHoriz,
  ArrowRight,
} from '@mui/icons-material'
import _ from 'lodash'
import qs from 'qs'
import dayjs from 'dayjs'
import * as consts from '@/common/consts'
import useQueryState, { type QueryState, optInt, optStr } from '@/common/use-query-state'
import * as service from '@/services/record'
import Nav from '@/components/record/ListNav'
import TitleAmount from '@/components/TitleAmount'

function parseFilterForm(params: QueryState) {
  const form: service.FilterForm = {
    record_type: optInt(params, 'record_type'),
    account_id: optInt(params, 'account_id'),
    keyword: optStr(params, 'keyword'),
  }

  if (form.record_type) {
    form.category_id = optInt(params, 'category_id')
  }

  return form
}

interface RecordGroup {
  month: string
  total: number
  records: service.RecordItem[]
}

function makeGroups(records: service.RecordItem[]) {
  const groups: RecordGroup[] = []

  _.forEach(records, record => {
    const month = dayjs(record.record_time).format('MMM YYYY')
    let group = _.find(groups, ['month', month])

    if (_.isUndefined(group)) {
      group = {
        month,
        total: 0.0,
        records: [],
      }
      groups.push(group)
    }

    group.records.push(record)

    if (record.record_type !== consts.RECORD_TYPE_TRANSFER) {
      group.total += _.toNumber(record.amount)
    }
  })

  return groups
}

const getDefaultYear = () => dayjs().format('YYYY')

export default () => {
  const [filterState, setFilterState] = useQueryState({})
  const filterForm = useMemo(() => parseFilterForm(filterState), [filterState])

  function handleChangeFilterForm(values: service.FilterForm) {
    const newParams = _(values).pickBy().mapValues(_.toString).value()
    setFilterState(newParams)
  }

  const [data, setData] = useState<service.RecordItem[]>([])
  const [year, setYear] = useState(getDefaultYear())
  const moreYear = dayjs(year, 'YYYY').subtract(1, 'year').format('YYYY')

  useEffect(() => {
    service.getRecordList(filterForm).then(payload => {
      setData(payload.data)
      setYear(getDefaultYear())
    })
  }, [filterForm])

  function handleLoadMore() {
    const args = {
      ...filterForm,
      year: moreYear,
    }
    service.getRecordList(args).then(payload => {
      setData([...data, ...payload.data])
      setYear(moreYear)
    })
  }

  function getIcon(recordType: number) {
    if (recordType === consts.RECORD_TYPE_EXPENSE) return <UploadIcon />
    if (recordType === consts.RECORD_TYPE_INCOME) return <DownloadIcon />
    if (recordType === consts.RECORD_TYPE_TRANSFER) return <SwapHoriz />
  }

  function getPrimaryText(item: service.RecordItem) {
    let title: React.ReactNode
    if (item.record_type === consts.RECORD_TYPE_TRANSFER) {
      title = (
        <Box display="flex">
          {item.account_name}
          <ArrowRight />
          {item.target_account_name}
        </Box>
      )
    } else {
      title = item.category_name
    }

    return <TitleAmount title={title} amount={item.amount} />
  }

  function getSecondaryText(item: service.RecordItem) {
    const time = dayjs(item.record_time).format('MMM D HH:mm')
    return item.remark ? `${time} - ${item.remark}` : time
  }

  const navigate = useNavigate()
  const currentLocation = useLocation()

  function handleAddRecord() {
    if (filterForm.account_id) {
      gotoEditRecord({ account_id: filterForm.account_id })
    } else {
      gotoEditRecord({})
    }
  }

  function handleEditRecord(id: number) {
    gotoEditRecord({ id })
  }

  function gotoEditRecord(params: object) {
    const searchParams = {
      ...params,
      from_url: `${currentLocation.pathname}${currentLocation.search}`,
    }
    navigate({
      pathname: '/record/edit',
      search: '?' + qs.stringify(searchParams),
    })
  }

  return (
    <Box>
      <Nav
        filterForm={filterForm}
        onChangeFilterForm={handleChangeFilterForm}
        onAddRecord={handleAddRecord}
      />
      <List>
        {makeGroups(data).map(group => (
          <React.Fragment key={group.month}>
            <ListSubheader>
              <TitleAmount title={group.month} amount={group.total} />
            </ListSubheader>
            {group.records.map(item => (
              <ListItem
                key={item.id}
                disablePadding
              >
                <ListItemButton
                  onClick={() => handleEditRecord(item.id)}
                  alignItems="flex-start"
                >
                  <ListItemAvatar><Avatar>{getIcon(item.record_type)}</Avatar></ListItemAvatar>
                  <ListItemText primary={getPrimaryText(item)} secondary={getSecondaryText(item)} />
                </ListItemButton>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ justifyContent: 'center' }}
            onClick={handleLoadMore}
          >Load {moreYear}</ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
