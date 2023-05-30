import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Notes as NotesIcon,
  Close as CloseIcon,
  AccountBalanceWallet,
} from '@mui/icons-material'
import SideMenu from '@/components/SideMenu'

interface Props {
  editing: boolean
  setEditing: (editing: boolean) => void
}

export default (props: Props) => {
  const navigate = useNavigate()

  const [addMenuAnchor, setAddMenuAnchor] = useState<HTMLElement | null>(null)

  function handleAdd(event: React.MouseEvent<HTMLButtonElement>) {
    setAddMenuAnchor(event.currentTarget)
  }

  function handleClose() {
    setAddMenuAnchor(null)
  }

  function handleEnterEditing() {
    props.setEditing(true)
  }

  function handleQuitEditing() {
    props.setEditing(false)
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <SideMenu />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Account List</Typography>
          {props.editing ? (
            <IconButton size="large" edge="end" color="inherit" onClick={handleQuitEditing}>
              <CloseIcon />
            </IconButton>
          ) : (
            <>
              <IconButton size="large" edge="end" color="inherit" onClick={handleEnterEditing}>
                <EditIcon />
              </IconButton>
              <IconButton size="large" edge="end" color="inherit" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </>
          )}

          <Menu
            anchorEl={addMenuAnchor}
            open={!!addMenuAnchor}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/account/edit') }}>
              <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
              <ListItemText>Add Account</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/record/edit') }}>
              <ListItemIcon><NotesIcon /></ListItemIcon>
              <ListItemText>Add Record</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
