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
import { useConfirm } from "material-ui-confirm";
import _ from 'lodash'
import dayjs, { Dayjs } from 'dayjs'
import * as consts from '@/common/consts'
import * as accountService from '@/services/account'
import * as categoryService from '@/services/category'
import * as service from '@/services/record'

function getEmptyErrors() {
  return {
    recordType: '',
    categoryId: '',
    accountId: '',
    targetAccountId: '',
    recordTime: '',
    amount: '',
    remark: '',
  }
}

export default () => {
  const navigate = useNavigate()
  const confirm = useConfirm()
  const [searchParams] = useSearchParams()
  const recordId = searchParams.get('id')

  useEffect(() => {
    if (recordId) {
      service.getRecord(_.toInteger(recordId)).then(payload => {
        setForm({
          id: String(payload.id),
          recordType: String(payload.record_type),
          categoryId: payload.category_id ? String(payload.category_id) : '',
          accountId: String(payload.account_id),
          targetAccountId: payload.target_account_id ? String(payload.target_account_id) : '',
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
    categoryId: '',
    accountId: '',
    targetAccountId: '',
    recordTime: dayjs() as Dayjs | null,
    amount: '',
    remark: '',
  })

  const [errors, setErrors] = useState(getEmptyErrors())

  function handleChangeRecordType(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      recordType: event.target.value,
      categoryId: '',
    })
  }

  function handleChangeCategoryId(event: SelectChangeEvent) {
    setForm({
      ...form,
      categoryId: event.target.value,
    })
  }

  function handleChangeAccountId(event: SelectChangeEvent) {
    setForm({
      ...form,
      accountId: event.target.value
    })
  }

  function handleChangeTargetAccountId(event: SelectChangeEvent) {
    setForm({
      ...form,
      targetAccountId: event.target.value
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

    if (form.recordType === String(consts.RECORD_TYPE_EXPENSE) || form.recordType === String(consts.RECORD_TYPE_INCOME)) {
      if (!form.categoryId) {
        errors.categoryId = 'Category cannot be empty.'
      }
      if (!form.accountId) {
        errors.accountId = 'Account cannot be empty.'
      }
    } else if (form.recordType === String(consts.RECORD_TYPE_TRANSFER)) {
      if (!form.accountId) {
        errors.accountId = 'Source account cannot be empty.'
      }
      if (!form.targetAccountId) {
        errors.targetAccountId = 'Target account cannot be empty.'
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
      category_id: form.categoryId ? _.toInteger(form.categoryId) : undefined,
      account_id: _.toInteger(form.accountId),
      target_account_id: form.targetAccountId ? _.toInteger(form.targetAccountId) : undefined,
      record_time: (form.recordTime || dayjs()).format('YYYY-MM-DD HH:mm:ss'),
      amount: _.toNumber(form.amount),
      remark: form.remark,
    }

    service.saveRecord(recordForm).then(() => {
      navigate('/record/list')
    })
  }

  function handleDelete() {
    confirm().then(() => {
      service.deleteRecord(_.toInteger(form.id)).then(() => {
        navigate('/record/list')
      })
    }, _.noop)
  }

  const [accounts, setAccounts] = useState<accountService.Account[]>([])

  useEffect(() => {
    accountService.getAccountList().then(payload => {
      setAccounts(payload.data)
    })
  }, [])

  const [categories, setCategories] = useState<categoryService.Category[]>([])

  useEffect(() => {
    categoryService.getCategoryList().then(payload => {
      setCategories(payload.data)
    })
  }, [])

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
        {(form.recordType === String(consts.RECORD_TYPE_EXPENSE) || form.recordType === String(consts.RECORD_TYPE_INCOME)) && (
          <FormControl error={!!errors.categoryId}>
            <InputLabel>Category</InputLabel>
            <Select
              value={form.categoryId}
              label="Category"
              onChange={handleChangeCategoryId}
            >
              {_.filter(categories, ['type', _.toInteger(form.recordType)]).map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.categoryId}</FormHelperText>
          </FormControl>
        )}
        <FormControl error={!!errors.accountId}>
          <InputLabel>{form.recordType === String(consts.RECORD_TYPE_TRANSFER) ? 'Source Account' : 'Account'}</InputLabel>
          <Select
            value={form.accountId}
            label={form.recordType === String(consts.RECORD_TYPE_TRANSFER) ? 'Source Account' : 'Account'}
            onChange={handleChangeAccountId}
          >
            {accounts.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.accountId}</FormHelperText>
        </FormControl>
        {form.recordType === String(consts.RECORD_TYPE_TRANSFER) && (
          <FormControl error={!!errors.targetAccountId}>
            <InputLabel>Target Account</InputLabel>
            <Select
              value={form.targetAccountId}
              label="Target Account"
              onChange={handleChangeTargetAccountId}
            >
              {accounts.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.targetAccountId}</FormHelperText>
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
        {form.id && (
          <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        )}
      </Stack>
    </Box>
  )
}
