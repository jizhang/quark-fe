import { get, post } from '@/common/request'

export interface FilterForm {
  record_type?: number
  category_id?: number
  account_id?: number
  year?: string
}

export interface RecordItem {
  id: number
  record_type: number
  category_name?: string
  account_name: string
  target_account_name?: string
  record_time: string
  amount: string
  remark: string
}

interface RecordListResponse {
  data: RecordItem[]
}

export async function getRecordList(filterForm: FilterForm): Promise<RecordListResponse> {
  return get('/api/record/list', filterForm)
}

interface RecordForm {
  id?: number
  record_type: number
  category_id?: number
  account_id: number
  target_account_id?: number
  record_time: string
  amount: string
  remark: string
}

export async function getRecord(id: number): Promise<RecordForm> {
  return get('/api/record/get', { id })
}

export async function saveRecord(form: RecordForm): Promise<{ id: number }> {
  return post('/api/record/save', form)
}

export async function deleteRecord(id: number): Promise<{ id: number }> {
  return post('/api/record/delete', { id })
}
