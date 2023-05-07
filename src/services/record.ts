import { get } from '@/common/request'

export interface RecordItem {
  id: number
  record_type: number
  expense_type: number
  expense_type_name: string
  income_type: number
  income_type_name: string
  account: number
  account_name: string
  target_account: number
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
