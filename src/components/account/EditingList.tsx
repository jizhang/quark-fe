import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material'
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
import { type AccountGroup } from '@/components/account/use-accounts'
import EditingItem from './EditingItem'

interface Props {
  group: AccountGroup
}

export default (props: Props) => {
  const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor))

  return (
    <DndContext
      sensors={sensors}
    >
      <List>
        <ListSubheader>{props.group.name}</ListSubheader>
        <SortableContext
          items={props.group.accounts}
        >
          {props.group.accounts.map(account => (
            <EditingItem key={account.id} account={account} onDelete={_.noop} />
          ))}
        </SortableContext>
      </List>
    </DndContext>
  )
}
