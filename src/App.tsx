import { RouterProvider } from "react-router-dom"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from "material-ui-confirm";
import router from './router'

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ConfirmProvider>
        <SnackbarProvider />
        <RouterProvider router={router} />
      </ConfirmProvider>
    </LocalizationProvider>
  );
}
