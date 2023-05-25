import _ from 'lodash'
import {
  LinearProgress,
} from '@mui/material'

interface Props {
  percent: number
}

export default (props: Props) => {
  const value = _.round(props.percent * 100)
  return (
    <LinearProgress variant="determinate" value={value} />
  )
}
