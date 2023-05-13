import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
} from '@mui/material'
import _ from 'lodash'
import * as service from '@/services/account'
import { formatAmount } from '@/common/utils'
import AccountListNav from '@/components/AccountListNav'

const ACCOUNT_TYPE_ASSET = 1
const ACCOUNT_TYPE_LIABILITY = 2

interface AccountGroup {
  name: string
  accounts: service.Account[]
}

export default () => {
  const [groups, setGroups] = useState<AccountGroup[]>([])

  useEffect(() => { // TODO Loading
    service.getAccountList().then((payload) => {
      const groups: AccountGroup[] = []

      const assets = _.filter(payload.data, ['type', ACCOUNT_TYPE_ASSET])
      if (assets.length > 0) {
        groups.push({
          name: 'Assets',
          accounts: assets,
        })
      }

      const liabilities = _.filter(payload.data, ['type', ACCOUNT_TYPE_LIABILITY])
      if (liabilities.length > 0) {
        groups.push({
          name: 'Liabilities',
          accounts: liabilities,
        })
      }

      setGroups(groups)
    })
  }, [])

  return (
    <Box>
      <AccountListNav />
      <List>
        {groups.map(group => (
          <React.Fragment key={group.name}>
            <ListSubheader>{group.name}</ListSubheader>
            {group.accounts.map(item => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={{
                    pathname: '/account/edit',
                    search: `id=${item.id}`,
                  }}
                >
                  <ListItemText>
                    <Box display="flex">
                      <Box flexGrow={1}>{item.name}</Box>
                      <Box>{formatAmount(item.balance)}</Box>
                    </Box>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
        {groups.length == 0 && (
          <ListItem>
            <ListItemText>No data</ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  )
}
