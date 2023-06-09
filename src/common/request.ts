import _ from 'lodash'
import qs from 'qs'
import { enqueueSnackbar } from 'notistack'
import { navigateHolder } from '@/common/utils'

class RequestError {
  constructor(public code: number, public payload: any) {}
}

export async function request(url: string, config?: RequestInit) {
  let response: Response

  // fetch error
  try {
    response = await fetch(url, config)
  } catch (error) {
    enqueueSnackbar(String(error), { variant: 'error' })
    throw new RequestError(0, {
      message: String(error),
      error,
    })
  }

  // success
  if (response.ok) {
    return await response.json()
  }

  // 400 Bad Request
  if (response.status === 400) {
    const payload = await response.json()
    // global toast
    if (payload.code === 400) {
      enqueueSnackbar(payload.message, { variant: 'error' })
    }
    // raise error for downstream processing
    throw new RequestError(payload.code, payload)
  }

  // 401 Unauthorized
  if (response.status === 401) {
    navigateHolder.navigate?.('/login')
    throw new RequestError(401, null)
  }

  // other error
  enqueueSnackbar(`${response.status} ${response.statusText}`, { variant: 'error' })
  throw new RequestError(response.status, response.statusText)
}

export async function get(url: string, args?: any) {
  if (!_.isEmpty(args)) {
    url += '?' + qs.stringify(args)
  }
  return request(url)
}

export async function post(url: string, json?: any) {
  const config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (!_.isEmpty(json)) {
    config.body = JSON.stringify(json)
  }
  return request(url, config)
}
