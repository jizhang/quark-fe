import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import type { Account } from '@/services/account'
import TitleAmount from '@/components/TitleAmount'

interface Props {
  account: Account
}

export default (props: Props) => {
  const { account } = props
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={{
          pathname: '/record/list',
          search: `account_id=${account.id}`,
        }}
      >
        <ListItemText>
          <TitleAmount title={account.name} amount={account.balance} />
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
