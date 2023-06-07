import React, { useEffect, useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import _ from 'lodash'
import * as consts from '@/common/consts'
import * as service from '@/services/account'
import Nav from '@/components/account/ListNav'
import TitleAmount from '@/components/TitleAmount'
import LinkItem from '@/components/account/LinkItem'
import EditingItem from '@/components/account/EditingItem'

interface AccountGroup {
  name: string
  accounts: service.Account[]
  total: number
}

function makeGroups(accounts: service.Account[]) {
  const groups: AccountGroup[] = []

  const assets = _.filter(accounts, ['type', consts.ACCOUNT_TYPE_ASSET])
  if (assets.length > 0) {
    groups.push({
      name: 'Assets',
      accounts: assets,
      total: _(assets).map('balance').sum(),
    })
  }

  const liabilities = _.filter(accounts, ['type', consts.ACCOUNT_TYPE_LIABILITY])
  if (liabilities.length > 0) {
    groups.push({
      name: 'Liabilities',
      accounts: liabilities,
      total: _(liabilities).map('balance').sum(),
    })
  }

  return groups
}

export default () => {
  const [accounts, setAccounts] = useState<service.Account[]>([])

  useEffect(() => { // TODO Loading
    service.getAccountList().then(payload => {
      setAccounts(payload.data)
    })
  }, [])

  const groups = makeGroups(accounts)
  const netCapital = _(groups).flatMap('accounts').map('balance').sum()

  const [editing, setEditing] = useState(false)

  function handleDelete(id: number) {
    setAccounts(_.reject(accounts, ['id', id]))
  }

  return (
    <Box>
      <Nav editing={editing} setEditing={setEditing} />
      <List>
        <ListItem>
          <ListItemText>
            <TitleAmount title="Net capital" amount={netCapital} />
          </ListItemText>
        </ListItem>
        {groups.map(group => (
          <React.Fragment key={group.name}>
            <ListSubheader>
              {editing ? group.name : (
                <TitleAmount title={group.name} amount={group.total} />
              )}
            </ListSubheader>
            {group.accounts.map(item => (
              <React.Fragment key={item.id}>
                {editing ? (
                  <EditingItem account={item} onDelete={handleDelete} />
                ) : (
                  <LinkItem account={item} />
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}
