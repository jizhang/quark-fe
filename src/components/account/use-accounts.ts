import { useState, useEffect } from 'react'
import _ from 'lodash'
import * as consts from '@/common/consts'
import * as accountService from '@/services/account'

export interface AccountGroup {
  id: number
  name: string
  total: number
  accounts: accountService.Account[]
}

export default () => {
  const [accounts, setAccounts] = useState<accountService.Account[]>([])

  useEffect(() => {
    accountService.getAccountList().then(payload => {
      setAccounts(payload.data)
    })
  }, [])

  const accountGroups: AccountGroup[] = _.flatMap(consts.ACCOUNT_GROUPS, group => {
    const groupAccounts = _.filter(accounts, ['type', group.id])
    if (groupAccounts.length === 0) return []
    return [
      {
        id: group.id,
        name: group.name,
        accounts: groupAccounts,
        total: _(groupAccounts).map('balance').map(_.toNumber).sum(),
      },
    ]
  })

  function deleteAccount(id: number) {
    setAccounts(_.reject(accounts, ['id', id]))
  }

  return {
    accounts,
    accountGroups,
    deleteAccount,
  }
}
