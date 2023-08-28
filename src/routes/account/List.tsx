import { useState } from 'react'
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
import EditingList from '@/components/account/EditingList'
import useAccounts, { type AccountGroup } from '@/components/account/use-accounts'

export default () => {
  const { accountGroups, deleteAccount } = useAccounts()
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
      </List>
      {accountGroups.map(group => {
        if (editing) {
          return <EditingList key={`group-${group.id}`} group={group} />
        } else {
          const accounts = _.reject(group.accounts, 'is_hidden')
          if (accounts.length === 0) {
            return null
          }
          return (
            <List key={`group-${group.id}`}>
              <ListSubheader>
                <TitleAmount title={group.name} amount={group.total} />
              </ListSubheader>
              {accounts.map(account => (
                <LinkItem key={account.id} account={account} />
              ))}
            </List>
          )
        }
      })}
    </Box>
  )
}
