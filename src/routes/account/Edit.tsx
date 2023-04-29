import React, { useState } from 'react'
import _ from 'lodash'
import { Link, useNavigate } from 'react-router-dom'
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
import * as service from '@/services/account'

export default () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    type: '1',
    balance: '0',
  })

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    balance: '',
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

  function handleChangeBalance(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      balance: event.target.value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = {
      name: '',
      type: '',
      balance: '',
    }

    if (!form.name) {
      errors.name = 'Account name cannot be empty.'
    }

    if (!_.includes(['1', '2'], form.type)) {
      errors.type = 'Invalid account type'
    }

    if (!form.balance) {
      errors.balance = 'Initial balance cannot be empty.'
    } else if (!_.isFinite(_.toNumber(form.balance))) {
      errors.balance = 'Invalid number format'
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
        <FormControl error={!!errors.type}>
          <FormLabel>Type</FormLabel>
          <RadioGroup row value={form.type} onChange={handleChangeType}>
            <FormControlLabel value="1" control={<Radio />} label="Asset" />
            <FormControlLabel value="2" control={<Radio />} label="Liability" />
          </RadioGroup>
          <FormHelperText>{errors.type}</FormHelperText>
        </FormControl>
        <TextField
          label="Initial Balance"
          value={form.balance}
          onChange={handleChangeBalance}
          error={!!errors.balance}
          helperText={errors.balance}
        ></TextField>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  )
}
