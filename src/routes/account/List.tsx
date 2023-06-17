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
import EditingItem from '@/components/account/EditingItem'
import useAccounts, { type AccountGroup } from '@/components/account/use-accounts'

export default () => {
  const { accountGroups, deleteAccount } = useAccounts()
  const netCapital = _(accountGroups).map('total').sum()

  const [editing, setEditing] = useState(false)

  function renderGroup(group: AccountGroup) {
    const accounts = editing ? group.accounts : _.reject(group.accounts, 'is_hidden')
    if (accounts.length === 0) return []
    return [
      <ListSubheader key={`group-${group.id}`}>
        {editing ? group.name : (
          <TitleAmount title={group.name} amount={group.total} />
        )}
      </ListSubheader>,
      ...accounts.map(account => editing ? (
        <EditingItem key={account.id} account={account} onDelete={deleteAccount} />
      ) : (
        <LinkItem key={account.id} account={account} />
      )),
    ]
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
        {accountGroups.flatMap(renderGroup)}
      </List>
    </Box>
  )
}
