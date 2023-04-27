import React from 'react'
import { RouterProvider } from "react-router-dom"
import { SnackbarProvider } from 'notistack';
import router from './router'

export default function App() {
  return (
    <React.Fragment>
      <SnackbarProvider />
      <RouterProvider router={router} />
    </React.Fragment>
  );
}
