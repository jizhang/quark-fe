import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import _ from 'lodash'
import { type AccountGroup } from '@/components/account/use-accounts'
import EditingItem from './EditingItem'

interface Props {
  group: AccountGroup
}

export default (props: Props) => {
  return (
    <List>
      <ListSubheader>{props.group.name}</ListSubheader>
      {props.group.accounts.map(account => (
        <EditingItem key={account.id} account={account} onDelete={_.noop} />
      ))}
    </List>
  )
}
