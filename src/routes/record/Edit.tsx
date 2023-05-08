import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Button,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import { DateTimePicker } from '@mui/x-date-pickers'
import _ from 'lodash'
import dayjs, { Dayjs } from 'dayjs'
import * as consts from '@/common/consts'
import * as service from '@/services/record'

function getEmptyErrors() {
  return {
    recordType: '',
    expenseType: '',
    incomeType: '',
    account: '',
    targetAccount: '',
    recordTime: '',
    amount: '',
    remark: '',
  }
}

export default () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const recordId = searchParams.get('id')

  useEffect(() => {
    if (recordId) {
      service.getRecord(_.toInteger(recordId)).then(payload => {
        setForm({
          id: String(payload.id),
          recordType: String(payload.record_type),
          expenseType: payload.expense_type ? String(payload.expense_type) : '',
          incomeType: payload.income_type ? String(payload.income_type) : '',
          account: String(payload.account),
          targetAccount: payload.target_account ? String(payload.target_account) : '',
          recordTime: dayjs(payload.record_time),
          amount: String(payload.amount),
          remark: String(payload.remark),
        })
      })
    }
  }, [recordId])

  const [form, setForm] = useState({
    id: '',
    recordType: '1',
    expenseType: '',
    incomeType: '',
    account: '',
    targetAccount: '',
    recordTime: dayjs() as Dayjs | null,
    amount: '',
    remark: '',
  })

  const [errors, setErrors] = useState(getEmptyErrors())

  function handleChangeRecordType(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      recordType: event.target.value,
    })
  }

  function handleChangeExpenseType(event: SelectChangeEvent) {
    setForm({
      ...form,
      expenseType: event.target.value
    })
  }

  function handleChangeIncomeType(event: SelectChangeEvent) {
    setForm({
      ...form,
      incomeType: event.target.value
    })
  }

  function handleChangeAccount(event: SelectChangeEvent) {
    setForm({
      ...form,
      account: event.target.value
    })
  }

  function handleChangeTargetAccount(event: SelectChangeEvent) {
    setForm({
      ...form,
      targetAccount: event.target.value
    })
  }

  function handleChangeRecordTime(value: Dayjs | null) {
    setForm({
      ...form,
      recordTime: value,
    })
  }

  function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      amount: event.target.value,
    })
  }

  function handleChangeRemark(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      remark: event.target.value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = getEmptyErrors()

    if (!form.recordType) {
      errors.recordType = 'Record type cannot be empty.'
    }

    if (form.recordType === String(consts.RECORD_TYPE_EXPENSE)) {
      if (!form.expenseType) {
        errors.expenseType = 'Expense type cannot be empty.'
      }
      if (!form.account) {
        errors.account = 'Account cannot be empty.'
      }
    } else if (form.recordType === String(consts.RECORD_TYPE_INCOME)) {
      if (!form.incomeType) {
        errors.incomeType = 'Income type annot be empty.'
      }
      if (!form.account) {
        errors.account = 'Account cannot be empty.'
      }
    } else if (form.recordType === String(consts.RECORD_TYPE_TRANSFER)) {
      if (!form.account) {
        errors.account = 'Source account cannot be empty.'
      }
      if (!form.targetAccount) {
        errors.targetAccount = 'Target account cannot be empty.'
      }
    } else {
      errors.recordType = 'Invalid record type'
    }

    if (!form.recordTime) {
      errors.recordTime = 'Record time cannot be empty.'
    }

    if (!form.amount) {
      errors.amount = 'Amount cannot be empty.'
    } else if (!_.isFinite(_.toNumber(form.amount))) {
      errors.amount = 'Invalid number format'
    }

    setErrors(errors)
    if (_(errors).values().some()) {
      return
    }

    const recordForm = {
      id: form.id ? _.toInteger(form.id) : undefined,
      record_type: _.toInteger(form.recordType),
      expense_type: form.expenseType ? _.toInteger(form.expenseType) : undefined,
      income_type: form.incomeType ? _.toInteger(form.incomeType) : undefined,
      account: _.toInteger(form.account),
      target_account: form.targetAccount ? _.toInteger(form.targetAccount) : undefined,
      record_time: (form.recordTime || dayjs()).format('YYYY-MM-DD HH:mm:ss'),
      amount: _.toNumber(form.amount),
      remark: form.remark,
    }

    service.saveRecord(recordForm).then(() => {
      navigate('/record/list')
    })
  }

  const accounts = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'CMB' },
    { id: 3, name: 'Alipay' },
  ]

  const expenseTypes = [
    { id: 1, name: 'Meal' },
    { id: 2, name: 'Snack' },
  ]

  const incomeTypes = [
    { id: 1, name: 'Salary' },
    { id: 2, name: 'Investment' },
  ]

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
            to="/record/list"
          >
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Add Record</Typography>
        </Toolbar>
      </AppBar>
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={handleSubmit}>
        <FormControl error={!!errors.recordType}>
          <FormLabel>Type</FormLabel>
          <RadioGroup row value={form.recordType} onChange={handleChangeRecordType}>
            <FormControlLabel value={consts.RECORD_TYPE_EXPENSE} control={<Radio />} label="Expense" />
            <FormControlLabel value={consts.RECORD_TYPE_INCOME} control={<Radio />} label="Income" />
            <FormControlLabel value={consts.RECORD_TYPE_TRANSFER} control={<Radio />} label="Transfer" />
          </RadioGroup>
          <FormHelperText>{errors.recordType}</FormHelperText>
        </FormControl>
        {form.recordType === String(consts.RECORD_TYPE_EXPENSE) && (
          <FormControl error={!!errors.expenseType}>
            <InputLabel>Expense Type</InputLabel>
            <Select
              value={form.expenseType}
              label="Expense Type"
              onChange={handleChangeExpenseType}
            >
              {expenseTypes.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.expenseType}</FormHelperText>
          </FormControl>
        )}
        {form.recordType === String(consts.RECORD_TYPE_INCOME) && (
          <FormControl error={!!errors.incomeType}>
            <InputLabel>Income Type</InputLabel>
            <Select
              value={form.incomeType}
              label="Income Type"
              onChange={handleChangeIncomeType}
            >
              {incomeTypes.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.incomeType}</FormHelperText>
          </FormControl>
        )}
        <FormControl error={!!errors.account}>
          <InputLabel>{form.recordType === String(consts.RECORD_TYPE_TRANSFER) ? 'Source Account' : 'Account'}</InputLabel>
          <Select
            value={form.account}
            label={form.recordType === String(consts.RECORD_TYPE_TRANSFER) ? 'Source Account' : 'Account'}
            onChange={handleChangeAccount}
          >
            {accounts.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.account}</FormHelperText>
        </FormControl>
        {form.recordType === String(consts.RECORD_TYPE_TRANSFER) && (
          <FormControl error={!!errors.targetAccount}>
            <InputLabel>Target Account</InputLabel>
            <Select
              value={form.targetAccount}
              label="Target Account"
              onChange={handleChangeTargetAccount}
            >
              {accounts.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.targetAccount}</FormHelperText>
          </FormControl>
        )}
        <DateTimePicker
          label="Time"
          value={form.recordTime}
          onChange={handleChangeRecordTime}
          slotProps={{
            textField: {
              error: !!errors.recordTime,
              helperText: errors.recordTime,
            },
          }}
        />
        <TextField
          label="Amount"
          value={form.amount}
          onChange={handleChangeAmount}
          error={!!errors.amount}
          helperText={errors.amount}
        ></TextField>
        <TextField
          label="Remark"
          value={form.remark}
          onChange={handleChangeRemark}
          error={!!errors.remark}
          helperText={errors.remark}
        ></TextField>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  )
}
