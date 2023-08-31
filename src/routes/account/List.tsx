import React, { useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import _ from 'lodash'
import Nav from '@/components/account/ListNav'
import TitleAmount from '@/components/TitleAmount'
import LinkItem from '@/components/account/LinkItem'
import EditingGroup from '@/components/account/EditingGroup'
import useAccounts from '@/components/account/use-accounts'

export default () => {
  const { accountGroups, deleteAccount, moveAccount } = useAccounts()
  const netCapital = _(accountGroups).map('total').sum()

  const [editing, setEditing] = useState(false)

  return (
    <Box>
      <Nav editing={editing} setEditing={setEditing} />
      <List>
        <ListItem>
          <ListItemText>
            <TitleAmount title="Net capital" amount={netCapital} />
          </ListItemText>
        </ListItem>
        {accountGroups.flatMap(group => {
          if (group.accounts.length === 0) {
            return []
          }

          if (editing) {
            return [
              <EditingGroup
                key={`group-${group.id}`}
                group={group}
                deleteAccount={deleteAccount}
                moveAccount={moveAccount}
              />,
            ]
          }

          const accounts = _.reject(group.accounts, 'is_hidden')
          if (accounts.length === 0) {
            return []
          }
          return [
            <React.Fragment key={`group-${group.id}`}>
              <ListSubheader>
                <TitleAmount title={group.name} amount={group.total} />
              </ListSubheader>
              {accounts.map(account => (
                <LinkItem key={account.id} account={account} />
              ))}
            </React.Fragment>,
          ]
        })}
      </List>
    </Box>
  )
}
