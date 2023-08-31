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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MouseSensor,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import _ from 'lodash'
import { formatAmount } from '@/common/utils'
import * as accountService from '@/services/account'

interface Props {
  account: accountService.Account
  onDelete: (id: number) => void
}

export default (props: Props) => {
  const { account } = props

  const confirm = useConfirm()
  const navigate = useNavigate()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({id: account.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const iconSx = { p: 0, ml: 2 }

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <ListItemIcon
        ref={setActivatorNodeRef}
        {...listeners}
      >
        <DragHandle />
      </ListItemIcon>
      <ListItemText secondary={formatAmount(account.balance)}>{account.name}</ListItemText>
      <IconButton onClick={handleEdit} sx={iconSx}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} sx={iconSx}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
