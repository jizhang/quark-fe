import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Nav from '@/components/Nav'

export default () => {
  return (
    <Box>
      <Nav title="Quark" />
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
  )
}
