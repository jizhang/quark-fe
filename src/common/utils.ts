import { NavigateFunction } from 'react-router-dom'

export function formatAmount(amount: number | string) {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const navigateHolder: { navigate?: NavigateFunction } = {}
