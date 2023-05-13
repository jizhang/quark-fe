import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material'
import {
  Add as AddIcon,
} from '@mui/icons-material'
import SideMenu from '@/components/SideMenu'

export default () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <SideMenu />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Record List</Typography>
          <IconButton size="large" edge="end" color="inherit" component={Link} to="/record/edit">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
