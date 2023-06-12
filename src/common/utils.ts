import { NavigateFunction } from 'react-router-dom'
import _ from 'lodash'

export const navigateHolder: { navigate?: NavigateFunction } = {}

export function formatAmount(amount: number | string) {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatAmountTick(value: any) {
  if (value >= 1000_000_000) return _.round(value / 1000_000_000, 1) + 'b'
  if (value >= 1000_000) return _.round(value / 1000_000, 1) + 'm'
  if (value >= 1000) return _.round(value / 1000, 1) + 'k'
  return value
}
