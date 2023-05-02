import { RouterProvider } from "react-router-dom"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SnackbarProvider } from 'notistack';
import router from './router'

export default function App() {
  return (
    <>
      <SnackbarProvider />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </>
  );
}
