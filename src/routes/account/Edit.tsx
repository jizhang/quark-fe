import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import _ from 'lodash'
import * as service from '@/services/account'

export default () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const accountId = searchParams.get('id')

  useEffect(() => {
    if (accountId) {
      service.getAccount(_.toNumber(accountId)).then(payload => {
        const { account } = payload
        setForm({
          id: String(account.id),
          name: account.name,
          type: String(account.type),
          initial_balance: String(account.initial_balance),
        })
      })
    }
  }, [accountId])

  const [form, setForm] = useState({
    id: '',
    name: '',
    type: '1',
    initial_balance: '0',
  })

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    initial_balance: '',
  })

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      name: event.target.value,
    })
  }

  function handleChangeType(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      type: event.target.value,
    })
  }

  function handleChangeInitialBalance(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      initial_balance: event.target.value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = {
      name: '',
      type: '',
      initial_balance: '',
    }

    if (!form.name) {
      errors.name = 'Account name cannot be empty.'
    }

    if (!_.includes(['1', '2'], form.type)) {
      errors.type = 'Invalid account type'
    }

    if (!form.initial_balance) {
      errors.initial_balance = 'Initial balance cannot be empty.'
    } else if (!_.isFinite(_.toNumber(form.initial_balance))) {
      errors.initial_balance = 'Invalid number format'
    }

    setErrors(errors)
    if (_(errors).values().some()) return

    service.saveAccount(form).then(() => {
      navigate('/')
    })
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Add Account</Typography>
        </Toolbar>
      </AppBar>
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          autoFocus
          value={form.name}
          onChange={handleChangeName}
          error={!!errors.name}
          helperText={errors.name}
        ></TextField>
        <FormControl error={!!errors.type} disabled={!!form.id}>
          <FormLabel>Type</FormLabel>
          <RadioGroup row value={form.type} onChange={handleChangeType}>
            <FormControlLabel value="1" control={<Radio />} label="Asset" />
            <FormControlLabel value="2" control={<Radio />} label="Liability" />
          </RadioGroup>
          <FormHelperText>{errors.type}</FormHelperText>
        </FormControl>
        <TextField
          label="Initial Balance"
          value={form.initial_balance}
          onChange={handleChangeInitialBalance}
          error={!!errors.initial_balance}
          helperText={errors.initial_balance}
          disabled={!!form.id}
        ></TextField>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  )
}
