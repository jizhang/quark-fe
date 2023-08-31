import {
  ListSubheader,
} from '@mui/material'
import {
  DndContext,
  closestCenter,
  TouchSensor,
  useSensor,
  useSensors,
  MouseSensor,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { type AccountGroup } from '@/components/account/use-accounts'
import EditingItem from './EditingItem'

interface Props {
  group: AccountGroup
  deleteAccount: (id: number) => void
  moveAccount: (activeId: number, overId: number) => void
}

export default (props: Props) => {
  const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over === null || over.id === active.id) {
      return
    }
    props.moveAccount(active.id as number, over.id as number)
  }

  return (
    <>
      <ListSubheader>{props.group.name}</ListSubheader>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={props.group.accounts}
          strategy={verticalListSortingStrategy}
        >
          {props.group.accounts.map(account => (
            <EditingItem
              key={account.id}
              account={account}
              onDelete={props.deleteAccount}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  )
}
