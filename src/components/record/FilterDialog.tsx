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
import { useFormik } from 'formik'
import * as consts from '@/common/consts'
import type { FilterForm } from '@/services/record'

interface Props {
  values: FilterForm
  open: boolean
  onApply: (values: FilterForm) => void,
  onClose: () => void,
}

export default (props: Props) => {
  const form = useFormik({
    initialValues: props.values,

    onSubmit: (values) => {
      props.onApply(values)
    },
  })

  function handleApply() {
    form.submitForm()
  }

  function handleClearAll() {
    form.setValues({
      record_type: '',
    })
    form.submitForm()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <Stack py={2} spacing={2}>
          <FormControl>
            <InputLabel>Record Type</InputLabel>
            <Select
              name="record_type"
              value={form.values.record_type}
              label="Record Type"
              onChange={form.handleChange}
            >
              <MenuItem value={String(consts.RECORD_TYPE_EXPENSE)}>Expense</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_INCOME)}>Income</MenuItem>
              <MenuItem value={String(consts.RECORD_TYPE_TRANSFER)}>Transfer</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleClearAll}>Clear All</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  )
}
