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
import type { Account } from '@/services/account'

interface Props {
  account: Account
}

export default (props: Props) => {
  const { account } = props

  const navigate = useNavigate()

  function handleEdit() {
    navigate({
      pathname: '/account/edit',
      search: `id=${account.id}`,
    })
  }

  function handleDelete() {
    alert('Not implemented yet.')
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
