import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

export type QueryState = Record<string, string>
export type SetQueryState = (newState: QueryState) => void

export default (initialState: QueryState): [QueryState, SetQueryState] => {
  const initialStateRef = useRef(initialState)
  const [searchParams, setSearchParams] = useSearchParams()
  const mergedState = useMemo(() => ({
    ...initialStateRef.current,
    ...Object.fromEntries(searchParams),
  }), [initialStateRef, searchParams])
  return [mergedState, setSearchParams]
}
