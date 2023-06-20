import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'

export type QueryState = Record<string, string>
export type SetQueryState = (newState: QueryState) => void

export function optInt(params: QueryState, key: string) {
  return params[key] ? _.toInteger(params[key]) : undefined
}

export function optStr(params: QueryState, key: string) {
  return params[key] || undefined
}

export default (initialState: QueryState): [QueryState, SetQueryState] => {
  const initialStateRef = useRef(initialState)
  const [searchParams, setSearchParams] = useSearchParams()
  const mergedState = useMemo(() => ({
    ...initialStateRef.current,
    ...Object.fromEntries(searchParams),
  }), [initialStateRef, searchParams])
  return [mergedState, setSearchParams]
}
