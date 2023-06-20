import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import _ from 'lodash'
import { useFormik } from 'formik'
import * as consts from '@/common/consts'
import type { FilterForm } from '@/services/record'
import * as accountService from '@/services/account'
import * as categoryService from '@/services/category'

const VALUE_ALL = 'all'

interface Props {
  values: FilterForm
  open: boolean
  onApply: (values: FilterForm) => void,
  onClose: () => void,
}

export default (props: Props) => {
  const form = useFormik({
    enableReinitialize: true,

    initialValues: {
      record_type: props.values.record_type ? String(props.values.record_type) : VALUE_ALL,
      category_id: props.values.category_id ? String(props.values.category_id): VALUE_ALL,
      account_id: props.values.account_id ? String(props.values.account_id) : VALUE_ALL,
      keyword: props.values.keyword || '',
    },

    onSubmit: (values) => {
      props.onApply({
        record_type: values.record_type !== VALUE_ALL ? _.toInteger(values.record_type) : undefined,
        category_id: values.category_id !== VALUE_ALL ? _.toInteger(values.category_id) : undefined,
        account_id: values.account_id !== VALUE_ALL ? _.toInteger(values.account_id) : undefined,
        keyword: _.trim(values.keyword) || undefined,
      })
    },
  })

  function handleApply() {
    form.submitForm()
  }

  function handleClearAll() {
    form.setValues({
      record_type: VALUE_ALL,
      category_id: VALUE_ALL,
      account_id: VALUE_ALL,
      keyword: '',
    })
    form.submitForm()
  }

  function handleClose() {
    form.resetForm()
    props.onClose()
  }

  function handleChangeRecordType(event: SelectChangeEvent) {
    form.setFieldValue('record_type', event.target.value)
    form.setFieldValue('category_id', VALUE_ALL)
  }

  const [categories, setCategories] = useState<categoryService.Category[]>([])
  const [accounts, setAccounts] = useState<accountService.Account[]>([])

  useEffect(() => {
    categoryService.getCategoryList().then(payload => {
      setCategories(payload.data)
    })

    accountService.getAccountList().then(payload => {
      setAccounts(payload.data)
    })
  }, [])

  function showCategory() {
    return _([consts.RECORD_TYPE_EXPENSE, consts.RECORD_TYPE_INCOME])
      .map(_.toString)
      .includes(form.values.record_type)
  }

  return (
    <Dialog open={props.open} fullWidth>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <Stack pt={1} spacing={2}>
          <FormControl>
            <InputLabel>Record Type</InputLabel>
            <Select
              name="record_type"
              value={form.values.record_type}
              label="Record Type"
              onChange={handleChangeRecordType}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_EXPENSE)}>Expense</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_INCOME)}>Income</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_TRANSFER)}>Transfer</MenuItem>
            </Select>
          </FormControl>
          <FormControl disabled={!showCategory()}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={form.values.category_id}
              label="Category"
              onChange={form.handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              {_.filter(categories, ['type', _.toInteger(form.values.record_type)]).map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Account</InputLabel>
            <Select
              name="account_id"
              value={form.values.account_id}
              label="Account"
              onChange={form.handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              {accounts.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Keyword"
            name="keyword"
            value={form.values.keyword}
            onChange={form.handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClearAll}>Clear All</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  )
}
