import { get, post } from '@/common/request'

export interface RecordItem {
  id: number
  record_type: number
  expense_type: number
  expense_type_name: string
  income_type: number
  income_type_name: string
  account_id: number
  account_name: string
  target_account_id: number
  target_account_name: string
  record_time: string
  amount: number
  remark: string
}

interface RecordListResponse {
  data: RecordItem[]
}

export async function getRecordList(): Promise<RecordListResponse> {
  return get('/api/record/list')
}

interface RecordForm {
  id?: number
  record_type: number
  expense_type?: number
  income_type?: number
  account_id: number
  target_account_id?: number
  record_time: string
  amount: number
  remark: string
}

export async function getRecord(id: number): Promise<RecordForm> {
  return get('/api/record/get', { id })
}

export async function saveRecord(form: RecordForm): Promise<{ id: number }> {
  return post('/api/record/save', form)
}
