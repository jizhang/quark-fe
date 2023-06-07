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
import EditingItem from '@/components/account/EditingItem'
import useAccounts from '@/components/account/use-accounts'

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
        {accountGroups.map(group => (
          <React.Fragment key={group.id}>
            <ListSubheader>
              {editing ? group.name : (
                <TitleAmount title={group.name} amount={group.total} />
              )}
            </ListSubheader>
            {group.accounts.map(item => (
              <React.Fragment key={item.id}>
                {editing ? (
                  <EditingItem account={item} onDelete={deleteAccount} />
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
