import { createHashRouter } from 'react-router-dom'
import { navigateHolder } from '@/common/utils'
import Login from './routes/Login'
import AccountList from './routes/account/List'
import AccountEdit from './routes/account/Edit'
import RecordList from './routes/record/List'
import RecordEdit from './routes/record/Edit'
import UserSetting from './routes/UserSetting'
import ChartIndex from './routes/chart/Index'

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
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
  {
    path: '/user-setting',
    element: <UserSetting />,
  },
  {
    path: '/chart/index',
    element: <ChartIndex />,
  },
])

navigateHolder.navigate = router.navigate

export default router
