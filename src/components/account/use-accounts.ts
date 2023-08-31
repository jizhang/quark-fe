import { useState, useEffect } from 'react'
import _ from 'lodash'
import * as consts from '@/common/consts'
import * as accountService from '@/services/account'
import { enqueueSnackbar } from 'notistack'

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

  function moveAccount(activeId: number, overId: number) {
    const activeAccount = _.find(accounts, ['id', activeId])
    const overIndex = _.findIndex(accounts, ['id', overId])
    if (_.isUndefined(activeAccount) || _.isUndefined(overIndex)) {
      return
    }

    const originalAccounts = _.clone(accounts)
    const reorderedAccounts = _.without(accounts, activeAccount)
    reorderedAccounts.splice(overIndex, 0, activeAccount)
    setAccounts(reorderedAccounts)

    accountService.moveAccount(activeId, overId).then(() => {
      enqueueSnackbar('Account order saved.', { variant: 'success' })
    }, () => {
      setAccounts(originalAccounts)
    })
  }

  return {
    accounts,
    accountGroups,
    deleteAccount,
    moveAccount,
  }
}
