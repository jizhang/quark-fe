import { useState } from 'react'
import { useNavigate } from "react-router-dom";
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
  Notes as NotesIcon,
  AccountBalanceWallet,
} from '@mui/icons-material'
import SideMenu from '@/components/SideMenu'

export default () => {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <SideMenu />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Account List</Typography>

          <IconButton size="large" edge="end" color="inherit" onClick={handleClick}>
            <AddIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
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