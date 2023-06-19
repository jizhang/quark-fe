import dayjs from 'dayjs'
import { MockMethod } from 'vite-plugin-mock'

function getRecordList({ query }) {
  const year: string = query.year ?? dayjs().format('YYYY')
  const data = [
    {
      id: parseInt(year) * 100 + 3,
      record_type: 1,
      category_name: 'Mobile',
      account_name: 'Alipay',
      record_time: `${year}-06-05 08:17:00`,
      amount: '-10.9',
      remark: 'chess cracker scald free ink bang verse redundant young glistening',
    },
    {
      id: parseInt(year) * 100 + 2,
      record_type: 2,
      category_name: 'Salary',
      account_name: 'CMB',
      record_time: `${year}-05-04 17:13:00`,
      amount: '12345.67',
      remark: 'Remark 2',
    },
    {
      id: parseInt(year) * 100 + 1,
      record_type: 3,
      account_name: 'CMB',
      target_account_name: 'Alipay',
      record_time: `${year}-05-03 06:32:00`,
      amount: '1000',
      remark: '',
    },
  ]
  return { data }
}

function getRecord() {
  return {
    id: 1,
    record_type: 1,
    category_id: 1,
    account_id: 3,
    record_time: '2023-05-05 08:17:00',
    amount: '10.9',
    remark: 'Remark 1',
  }
}

function saveRecord() {
  return {
    id: 1,
  }
}

function deleteRecord() {
  return {
    id: 1,
  }
}

export default [
  {
    url: '/api/record/list',
    response: getRecordList,
  },
  {
    url: '/api/record/get',
    response: getRecord,
  },
  {
    url: '/api/record/save',
    response: saveRecord,
  },
  {
    url: '/api/record/delete',
    response: deleteRecord,
  },
] as MockMethod[]
