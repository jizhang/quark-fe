import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import _ from 'lodash'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import * as accountService from '@/services/account'
import * as userService from '@/services/user'

export default () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      default_account_id: '',
    },
    validationSchema: yup.object({
      default_account_id: yup.number().required('Required'),
    }),
    onSubmit: values => {
      userService.saveUserSetting({
        default_account_id: _.toInteger(values.default_account_id),
      }).then(() => {
        enqueueSnackbar('Settings saved.', { variant: 'success' })
        navigate('/')
      })
    }
  })

  useEffect(() => {
    userService.getUserSetting().then(payload => {
      formik.setValues({
        default_account_id: payload.default_account_id ? String(payload.default_account_id) : '',
      })
    })
  }, [])

  const [accounts, setAccounts] = useState<accountService.Account[]>([])

  useEffect(() => {
    accountService.getAccountList().then(payload => {
      setAccounts(payload.data)
    })
  }, [])

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
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Settings</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack px={2} py={3} spacing={2} component="form" onSubmit={formik.handleSubmit}>
        <FormControl error={!!formik.errors.default_account_id}>
          <InputLabel>Default Account</InputLabel>
          <Select
            label="Default Account"
            name="default_account_id"
            value={formik.values.default_account_id}
            onChange={formik.handleChange}
          >
            {accounts.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{formik.errors.default_account_id}</FormHelperText>
        </FormControl>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  )
}
