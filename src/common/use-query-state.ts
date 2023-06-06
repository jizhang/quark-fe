import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export type QueryState = Record<string, string>
export type SetQueryState = (newState: QueryState) => void

export default (initialState: QueryState): [QueryState, SetQueryState] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const mergedState = {
    ...initialState,
    ...Object.fromEntries(searchParams),
  }

  const [state, setState] = useState(mergedState)

  useEffect(() => {
    setState(mergedState)
  }, [searchParams])

  return [state, setSearchParams]
}
