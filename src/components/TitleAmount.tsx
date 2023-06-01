import React from 'react'
import { Box } from '@mui/material'
import { formatAmount } from '@/common/utils'

interface Props {
  title: React.ReactNode
  amount: number | string
}

export default (props: Props) => {
  return (
    <Box display="flex" key={String(props.amount)}>
      <Box flexGrow={1}>{props.title}</Box>
      <Box>{formatAmount(props.amount)}</Box>
    </Box>
  )
}
