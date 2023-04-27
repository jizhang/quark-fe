import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Button, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material'
import * as service from '@/services/account'
import Nav from '@/components/Nav'

export default () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    type: '1',
    balance: '0',
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
    service.saveAccount(form).then(() => {
      navigate('/')
    })
  }

  return (
    <Box>
      <Nav title="Add Acount" />
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField label="Name" autoFocus value={form.name} onChange={handleChangeName}></TextField>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup row value={form.type} onChange={handleChangeType}>
            <FormControlLabel value="1" control={<Radio />} label="Asset" />
            <FormControlLabel value="2" control={<Radio />} label="Liability" />
          </RadioGroup>
        </FormControl>
        <TextField label="Initial Balance" value={form.balance} onChange={handleChangeBalance}></TextField>
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">Save</Button>
          <Button onClick={() => { navigate('/') }}>Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
