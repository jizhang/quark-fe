import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'

export type QueryState = Record<string, string>
export type SetQueryState = (newState: QueryState) => void

export default (initialState: QueryState): [QueryState, SetQueryState] => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [state, setState] = useState({
    ...initialState,
    ...Object.fromEntries(searchParams),
  })

  useEffect(() => {
    const mergedState = {
      ...initialState,
      ...Object.fromEntries(searchParams),
    }
    setState(prevState => _.isEqual(prevState, mergedState) ? prevState : mergedState)
  }, [initialState, searchParams])

  return [state, setSearchParams]
}
