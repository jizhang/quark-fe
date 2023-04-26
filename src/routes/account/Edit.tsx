import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import Nav from '@/components/Nav'

export default () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Nav title="Add Acount" />
      <Button variant="contained">Save</Button>
      <Button variant="outlined" onClick={() => { navigate('/') }}>Cancel</Button>
    </Box>
  )
}
