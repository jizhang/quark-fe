import { NavigateFunction } from "react-router-dom"

export function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const navigateHolder = {
  navigate: (() => {}) as NavigateFunction,
}
