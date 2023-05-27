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
} from '@mui/material'
import _ from 'lodash'
import { useFormik } from 'formik'
import * as consts from '@/common/consts'
import type { FilterForm } from '@/services/record'

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
    },

    onSubmit: (values) => {
      props.onApply({
        record_type: values.record_type !== VALUE_ALL ? _.toInteger(values.record_type) : undefined,
        category_id: values.category_id !== VALUE_ALL ? _.toInteger(values.category_id) : undefined,
        account_id: values.account_id !== VALUE_ALL ? _.toInteger(values.account_id) : undefined,
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
    })
    form.submitForm()
  }

  function handleClose() {
    form.resetForm()
    props.onClose()
  }

  return (
    <Dialog open={props.open} fullWidth>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <Stack pt={1} spacing={2}>
          <FormControl>
            <InputLabel shrink>Record Type</InputLabel>
            <Select
              name="record_type"
              value={form.values.record_type}
              label="Record Type"
              onChange={form.handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_EXPENSE)}>Expense</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_INCOME)}>Income</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_TRANSFER)}>Transfer</MenuItem>
            </Select>
          </FormControl>
          <FormControl disabled={form.values.record_type === VALUE_ALL}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={form.values.category_id}
              label="Category"
              onChange={form.handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="1">Category 1</MenuItem>
              <MenuItem value="2">Category 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel shrink>Account</InputLabel>
            <Select
              name="account_id"
              value={form.values.account_id}
              label="Account"
              onChange={form.handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="1">Account 1</MenuItem>
              <MenuItem value="2">Account 2</MenuItem>
            </Select>
          </FormControl>
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
