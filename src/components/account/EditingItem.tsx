import { useNavigate } from 'react-router-dom'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragHandle,
} from '@mui/icons-material'
import { useConfirm } from 'material-ui-confirm'
import _ from 'lodash'
import * as accountService from '@/services/account'

interface Props {
  account: accountService.Account
  onDelete: (id: number) => void
}

export default (props: Props) => {
  const { account } = props

  const confirm = useConfirm()
  const navigate = useNavigate()

  function handleEdit() {
    navigate({
      pathname: '/account/edit',
      search: `id=${account.id}`,
    })
  }

  function handleDelete() {
    confirm().then(() => {
      accountService.deleteAccount(account.id).then(() => {
        props.onDelete(account.id)
      })
    }, _.noop)
  }

  function handleDragDrop() {
    alert('Not implemented yet.')
  }

  return (
    <ListItem key={account.id}>
      <ListItemIcon onClick={handleDragDrop}>
        <DragHandle />
      </ListItemIcon>
      <ListItemText>{account.name}</ListItemText>
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
