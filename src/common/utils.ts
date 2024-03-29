import { NavigateFunction } from 'react-router-dom'
import _ from 'lodash'
import dayjs from 'dayjs'

export const navigateHolder: { navigate?: NavigateFunction } = {}

export function formatAmount(amount: number | string) {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatAmountTick(value: any) {
  const absValue = Math.abs(value)
  if (absValue >= 1000_000_000) return _.round(value / 1000_000_000, 1) + 'b'
  if (absValue >= 1000_000) return _.round(value / 1000_000, 1) + 'm'
  if (absValue >= 1000) return _.round(value / 1000, 1) + 'k'
  return value
}

export function formatAmountEdit(value: string) {
  if (value.includes('.')) {
    return value.replace(/0+$/, '').replace(/\.$/, '')
  }
  return value
}

export function formatMonth(value: any, format: string) {
  return dayjs(String(value), 'YYYYMM').format(format)
}
