import {
  Box,
  List,
  ListItemButton
} from '@mui/material'
import Nav from '@/components/RecordListNav'

export default () => {
  return (
    <Box>
      <Nav />
      <List>
        <ListItemButton>Item 1</ListItemButton>
        <ListItemButton>Item 2</ListItemButton>
        <ListItemButton>Item 3</ListItemButton>
      </List>
    </Box>
  )
}
