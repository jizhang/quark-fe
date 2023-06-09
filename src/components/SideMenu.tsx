import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Notes as NotesIcon,
  Settings as SettingsIcon,
  AccountBalanceWallet,
  BarChart,
} from '@mui/icons-material'

export default () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function gotoAccounts() {
    setOpen(false)
    navigate('/')
  }

  function gotoRecords() {
    setOpen(false)
    navigate('/record/list')
  }

  function gotoCharts() {
    setOpen(false)
    navigate('/chart/index')
  }

  function gotoSettings() {
    setOpen(false)
    navigate('/user-setting')
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={() => { setOpen(true) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => { setOpen(false) }}
      >
        <List sx={{ width: 250 }}>
          <ListItemButton onClick={gotoAccounts}>
            <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
            <ListItemText>Accounts</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={gotoRecords}>
            <ListItemIcon><NotesIcon /></ListItemIcon>
            <ListItemText>Records</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={gotoCharts}>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText>Charts</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={gotoSettings}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
