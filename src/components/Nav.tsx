import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import { Link } from "react-router-dom";

interface Props {
  title: string
}

export default (props: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>{props.title}</Typography>
        <IconButton size="large" edge="end" color="inherit" component={Link} to="/account/edit">
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
