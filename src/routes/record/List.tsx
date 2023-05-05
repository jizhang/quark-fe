import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  SwapHoriz,
  ArrowRight,
} from '@mui/icons-material'
import Nav from '@/components/RecordListNav'

export default () => {
  return (
    <Box>
      <Nav />
      <List>
        <ListItem disablePadding secondaryAction="10.90">
          <ListItemButton>
            <ListItemAvatar><Avatar><UploadIcon /></Avatar></ListItemAvatar>
            <ListItemText primary="Mobile" secondary="May 5 08:17 - Remark" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding secondaryAction="12,345.67">
          <ListItemButton>
            <ListItemAvatar><Avatar><DownloadIcon /></Avatar></ListItemAvatar>
            <ListItemText primary="Salary" secondary="May 4 17:13 - Remark" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding secondaryAction="1,000.00">
          <ListItemButton>
            <ListItemAvatar><Avatar><SwapHoriz /></Avatar></ListItemAvatar>
            <ListItemText primary={<Typography display="flex">CMB<ArrowRight />Alipay</Typography>} secondary="May 3 06:32"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
