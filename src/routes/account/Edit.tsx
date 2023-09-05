import { useState, useEffect } from 'react'
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
  Switch,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import _ from 'lodash'
import { useFormik } from 'formik'
import * as yup from 'yup'
import * as consts from '@/common/consts'
import * as utils from '@/common/utils'
import * as service from '@/services/account'

export default () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const accountId = searchParams.get('id')

  useEffect(() => {
    if (accountId) {
      service.getAccount(_.toNumber(accountId)).then(account => {
        setInitialValues({
          id: account.id,
          name: account.name,
          is_hidden: account.is_hidden,
          type: String(account.type),
          initial_balance: utils.formatAmountEdit(account.initial_balance),
        })
      })
    }
  }, [accountId])

  const [initialValues, setInitialValues] = useState({
    id: undefined as number | undefined,
    name: '',
    is_hidden: false,
    type: String(consts.ACCOUNT_TYPE_ASSET),
    initial_balance: '0',
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,

    validationSchema: yup.object({
      name: yup.string().required('Account name cannot be empty.'),
      type: yup.number()
        .required()
        .oneOf([consts.ACCOUNT_TYPE_ASSET, consts.ACCOUNT_TYPE_LIABILITY], 'Invalid account type'),
      initial_balance: yup.number()
        .required('Initial balance cannot be empty.')
        .typeError('Invalid number format'),
    }),

    onSubmit: (values) => {
      const accountForm = {
        id: values.id,
        name: values.name,
        is_hidden: values.is_hidden,
        type: _.toInteger(values.type),
        initial_balance: values.initial_balance,
      }
      service.saveAccount(accountForm).then(() => {
        navigate('/')
      })
    },
  })

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
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{form.values.id ? 'Edit' : 'Add'} Account</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={form.handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.values.name}
          onChange={form.handleChange}
          error={form.touched.name && !!form.errors.name}
          helperText={form.touched.name && form.errors.name}
        ></TextField>
        <FormControl>
          <FormControlLabel
            label="Hidden"
            control={
              <Switch
                name="is_hidden"
                checked={form.values.is_hidden}
                onChange={form.handleChange}
              />
            }
          />
        </FormControl>
        <FormControl
          error={form.touched.type && !!form.errors.type}
          disabled={!!form.values.id}
        >
          <FormLabel>Type</FormLabel>
          <RadioGroup
            row
            name="type"
            value={form.values.type}
            onChange={form.handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Asset" />
            <FormControlLabel value="2" control={<Radio />} label="Liability" />
          </RadioGroup>
          <FormHelperText>{form.touched.type && form.errors.type}</FormHelperText>
        </FormControl>
        <TextField
          label="Initial Balance"
          name="initial_balance"
          value={form.values.initial_balance}
          onChange={form.handleChange}
          error={form.touched.initial_balance && !!form.errors.initial_balance}
          helperText={form.touched.initial_balance && form.errors.initial_balance}
          disabled={!!form.values.id}
        ></TextField>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  )
}
