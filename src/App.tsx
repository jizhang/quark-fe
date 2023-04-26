import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AccountList from './routes/account/List'
import AccountEdit from './routes/account/Edit'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountList />,
  },
  {
    path: '/account/edit',
    element: <AccountEdit />,
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
