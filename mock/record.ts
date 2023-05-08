import { MockMethod } from 'vite-plugin-mock'

function getRecordList() {
  return {
    data: [
      {
        id: 1,
        record_type: 1,
        expense_type: 1,
        expense_type_name: 'Mobile',
        account: 3,
        account_name: 'Alipay',
        record_time: '2023-05-05 08:17:00',
        amount: 10.9,
        remark: 'Remark 1',
      },
      {
        id: 2,
        record_type: 2,
        income_type: 1,
        income_type_name: 'Salary',
        account: 2,
        account_name: 'CMB',
        record_time: '2023-05-04 17:13:00',
        amount: 12345.67,
        remark: 'Remark 2',
      },
      {
        id: 3,
        record_type: 3,
        account: 2,
        account_name: 'CMB',
        target_account: 3,
        target_account_name: 'Alipay',
        record_time: '2023-05-03 06:32:00',
        amount: 1000,
        remark: '',
      },
    ]
  }
}

function getRecord() {
  return {
    id: 1,
    record_type: 1,
    expense_type: 1,
    account: 3,
    record_time: '2023-05-05 08:17:00',
    amount: 10.9,
    remark: 'Remark 1',
  }
}

function saveRecord() {
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
] as MockMethod[]
