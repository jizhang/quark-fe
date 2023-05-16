import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { login } from '@/services/user'

export default () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
    remember_me: '1',
  })

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      username: event.target.value,
    })
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      password: event.target.value,
    })
  }

  function handleChangeRememberMe(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      remember_me: event.target.checked ? '1' : '0',
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    login(form).then(user => {
      navigate('/')
    })
  }

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Login</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={form.username}
          onChange={handleChangeUsername}
        />
        <TextField
          label="Password"
          value={form.password}
          onChange={handleChangePassword}
          type="password"
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={form.remember_me === '1'} onChange={handleChangeRememberMe} />} label="Remember Me" />
        </FormGroup>
        <Button variant="contained" type="submit">Login</Button>
      </Stack>
    </Box>
  )
}
