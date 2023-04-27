import { createBrowserRouter } from "react-router-dom";
import AccountList from './routes/account/List'
import AccountEdit from './routes/account/Edit'

export default createBrowserRouter([
  {
    path: "/",
    element: <AccountList />,
  },
  {
    path: '/account/edit',
    element: <AccountEdit />,
  }
]);
