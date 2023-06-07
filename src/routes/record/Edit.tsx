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
  MenuItem,
  ListSubheader,
} from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useConfirm } from 'material-ui-confirm'
import _ from 'lodash'
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import * as yup from 'yup'
import * as consts from '@/common/consts'
import * as userService from '@/services/user'
import * as categoryService from '@/services/category'
import * as service from '@/services/record'
import useAccounts, { type AccountGroup } from '@/components/account/use-accounts'

function renderAccounts(groups: AccountGroup[]) {
  return groups.flatMap(group => {
    return [
      <ListSubheader key={`group-${group.id}`}>{group.name}</ListSubheader>,
      ...group.accounts.map(account => (
        <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>
      )),
    ]
  })
}

export default () => {
  const navigate = useNavigate()
  const confirm = useConfirm()
  const [searchParams] = useSearchParams()
  const recordId = searchParams.get('id')

  useEffect(() => {
    if (recordId) {
      service.getRecord(_.toInteger(recordId)).then(payload => {
        form.setValues({
          id: String(payload.id),
          record_type: String(payload.record_type),
          category_id: payload.category_id ? String(payload.category_id) : '',
          account_id: String(payload.account_id),
          target_account_id: payload.target_account_id ? String(payload.target_account_id) : '',
          record_time: dayjs(payload.record_time),
          amount: payload.amount,
          remark: String(payload.remark),
        })
      })
    }
  }, [recordId])

  const form = useFormik({
    initialValues: {
      id: '',
      record_type: String(consts.RECORD_TYPE_EXPENSE),
      category_id: '',
      account_id: '',
      target_account_id: '',
      record_time: dayjs() as Dayjs | null,
      amount: '',
      remark: '',
    },

    validationSchema: yup.object({
      record_type: yup.number().required('Record type cannot be empty.'),
      category_id: yup.number()
        .when('record_type', {
          is: (value: number) => value === consts.RECORD_TYPE_EXPENSE || value === consts.RECORD_TYPE_INCOME,
          then: schema => schema.required('Category cannot be empty.'),
        }),
      account_id: yup.number()
        .when('record_type', {
          is: consts.RECORD_TYPE_TRANSFER,
          then: schema => schema.required('Source account cannot be empty.'),
          otherwise: schema => schema.required('Account cannot be empty.'),
        }),
      target_account_id: yup.number()
        .when('record_type', {
          is: consts.RECORD_TYPE_TRANSFER,
          then: schema => schema.required('Target account cannot be empty.'),
        }),
      record_time: yup.mixed().required('Record time cannot be empty.'),
      amount: yup.number()
        .required('Amount cannot be empty.')
        .typeError('Invalid number format'),
      remark: yup.string(),
    }),

    onSubmit: (values) => {
      const recordForm = {
        id: values.id ? _.toInteger(values.id) : undefined,
        record_type: _.toInteger(values.record_type),
        category_id: values.category_id ? _.toInteger(values.category_id) : undefined,
        account_id: _.toInteger(values.account_id),
        target_account_id: values.target_account_id ? _.toInteger(values.target_account_id) : undefined,
        record_time: (values.record_time || dayjs()).format('YYYY-MM-DD HH:mm:ss'),
        amount: values.amount,
        remark: values.remark,
      }

      service.saveRecord(recordForm).then(() => {
        navigate('/record/list')
      })
    },
  })

  function handleChangeRecordType(event: React.ChangeEvent<HTMLInputElement>) {
    form.setFieldValue('record_type', event.target.value)
    form.setFieldValue('category_id', '', false)
  }

  function handleChangeRecordTime(value: Dayjs | null) {
    form.setFieldValue('record_time', value)
  }

  function handleDelete() {
    confirm().then(() => {
      service.deleteRecord(_.toInteger(form.values.id)).then(() => {
        navigate('/record/list')
      })
    }, _.noop)
  }

  const { accountGroups } = useAccounts()

  const [categories, setCategories] = useState<categoryService.Category[]>([])

  useEffect(() => {
    categoryService.getCategoryList().then(payload => {
      setCategories(payload.data)
    })
  }, [])

  useEffect(() => {
    if (!recordId) {
      userService.getUserSetting().then(payload => {
        if (payload.default_account_id) {
          form.setFieldValue('account_id', String(payload.default_account_id))
        }
      })
    }
  }, [recordId])

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
            to="/record/list"
          >
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Add Record</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={form.handleSubmit}>
        <FormControl error={form.touched.record_type && !!form.errors.record_type}>
          <FormLabel>Type</FormLabel>
          <RadioGroup row name="record_type" value={form.values.record_type} onChange={handleChangeRecordType}>
            <FormControlLabel value={consts.RECORD_TYPE_EXPENSE} control={<Radio />} label="Expense" />
            <FormControlLabel value={consts.RECORD_TYPE_INCOME} control={<Radio />} label="Income" />
            <FormControlLabel value={consts.RECORD_TYPE_TRANSFER} control={<Radio />} label="Transfer" />
          </RadioGroup>
          <FormHelperText>{form.touched.record_type && form.errors.record_type}</FormHelperText>
        </FormControl>
        {(form.values.record_type === String(consts.RECORD_TYPE_EXPENSE) || form.values.record_type === String(consts.RECORD_TYPE_INCOME)) && (
          <FormControl error={form.touched.category_id && !!form.errors.category_id}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={form.values.category_id}
              label="Category"
              onChange={form.handleChange}
            >
              {_.filter(categories, ['type', _.toInteger(form.values.record_type)]).map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{form.touched.category_id && form.errors.category_id}</FormHelperText>
          </FormControl>
        )}
        <FormControl error={form.touched.account_id && !!form.errors.account_id}>
          <InputLabel>{form.values.record_type === String(consts.RECORD_TYPE_TRANSFER) ? 'Source Account' : 'Account'}</InputLabel>
          <Select
            name="account_id"
            value={form.values.account_id}
            label={form.values.record_type === String(consts.RECORD_TYPE_TRANSFER) ? 'Source Account' : 'Account'}
            onChange={form.handleChange}
          >{renderAccounts(accountGroups)}</Select>
          <FormHelperText>{form.touched.account_id && form.errors.account_id}</FormHelperText>
        </FormControl>
        {form.values.record_type === String(consts.RECORD_TYPE_TRANSFER) && (
          <FormControl error={form.touched.target_account_id && !!form.errors.target_account_id}>
            <InputLabel>Target Account</InputLabel>
            <Select
              name="target_account_id"
              value={form.values.target_account_id}
              label="Target Account"
              onChange={form.handleChange}
            >{renderAccounts(accountGroups)}</Select>
            <FormHelperText>{form.touched.target_account_id && form.errors.target_account_id}</FormHelperText>
          </FormControl>
        )}
        <DateTimePicker
          label="Time"
          value={form.values.record_time}
          onChange={handleChangeRecordTime}
          slotProps={{
            textField: {
              name: 'record_time',
              error: form.touched.record_time && !!form.errors.record_time,
              helperText: form.touched.record_time && form.errors.record_time,
            },
          }}
        />
        <TextField
          label="Amount"
          name="amount"
          value={form.values.amount}
          onChange={form.handleChange}
          error={form.touched.amount && !!form.errors.amount}
          helperText={form.touched.amount && form.errors.amount}
        ></TextField>
        <TextField
          label="Remark"
          name="remark"
          value={form.values.remark}
          onChange={form.handleChange}
          error={form.touched.remark && !!form.errors.remark}
          helperText={form.touched.remark && form.errors.remark}
        ></TextField>
        <Button variant="contained" type="submit">Save</Button>
        {form.values.id && (
          <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        )}
      </Stack>
    </Box>
  )
}
