import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import _ from 'lodash'
import { enqueueSnackbar } from 'notistack'
import * as accountService from '@/services/account'
import * as userService from '@/services/user'

export default () => {
  const navigate = useNavigate()

  useEffect(() => {
    userService.getUserSetting().then(payload => {
      setForm({
        default_account_id: payload.default_account_id ? String(payload.default_account_id) : '',
      })
    })
  }, [])

  const [form, setForm] = useState({
    default_account_id: '',
  })

  const [errors, setErrors] = useState({
    default_account_id: '',
  })

  function handleChangeDefaultAccountId(event: SelectChangeEvent) {
    setForm({
      ...form,
      default_account_id: event.target.value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = {
      default_account_id: '',
    }

    if (!form.default_account_id) {
      errors.default_account_id = 'Required'
    }

    setErrors(errors)
    if (_(errors).values().some()) {
      return
    }

    userService.saveUserSetting({
      default_account_id: _.toInteger(form.default_account_id),
    }).then(() => {
      enqueueSnackbar('Settings saved.', { variant: 'success' })
      navigate('/')
    })
  }

  const [accounts, setAccounts] = useState<accountService.Account[]>([])

  useEffect(() => {
    accountService.getAccountList().then(payload => {
      setAccounts(payload.data)
    })
  }, [])

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Settings</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={handleSubmit}>
        <FormControl error={!!errors.default_account_id}>
          <InputLabel>Default Account</InputLabel>
          <Select
            value={form.default_account_id}
            label="Default Expense Account"
            onChange={handleChangeDefaultAccountId}
          >
            {accounts.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.default_account_id}</FormHelperText>
        </FormControl>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  )
}
