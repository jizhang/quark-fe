import { createBrowserRouter } from "react-router-dom";
import Login from './routes/Login'
import AccountList from './routes/account/List'
import AccountEdit from './routes/account/Edit'
import RecordList from './routes/record/List'
import RecordEdit from './routes/record/Edit'

export default createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: "/",
    element: <AccountList />,
  },
  {
    path: '/account/edit',
    element: <AccountEdit />,
  },
  {
    path: '/record/list',
    element: <RecordList />,
  },
  {
    path: '/record/edit',
    element: <RecordEdit />,
  },
])
