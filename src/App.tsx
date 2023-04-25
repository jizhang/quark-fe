import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

export default function App() {
  return (
    <Box>
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
          <Typography variant="h6">Quark</Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListSubheader>Assets</ListSubheader>
        <ListItemButton>
          <ListItemText>Cash</ListItemText>
          <ListItemSecondaryAction>350.00</ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>CMB</ListItemText>
          <ListItemSecondaryAction>224,453.89</ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>Alipay</ListItemText>
          <ListItemSecondaryAction>500,174.16</ListItemSecondaryAction>
        </ListItemButton>
        <ListSubheader>Liabilities</ListSubheader>
        <ListItemButton>
          <ListItemText>CMB credit card</ListItemText>
          <ListItemSecondaryAction>11.00</ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>Home loan</ListItemText>
          <ListItemSecondaryAction>744,519.99</ListItemSecondaryAction>
        </ListItemButton>
      </List>
    </Box>
  );
}
