import {React, useState, useEffect} from 'react'
import Layout from './../components/Layout/Layout'
import {Form, Input, Select, DatePicker, Space, Modal, message, Table} from 'antd'
import {UnorderedListOutlined, AreaChartOutlined} from '@ant-design/icons'
import moment from 'moment'
import axios from 'axios'
// import { addTransaction, getAllTransactionsOfAUser } from "../utils/urls"
import { addTransaction } from "../utils/urls"
import Spinner from "../components/Spinner"
import Analytics from '../components/Analytics'
const SERVER_URL = "http://localhost:8080/api/v1"
const { RangePicker } = DatePicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [allTransactions, setAllTransactions] = useState([])
  const [frequency, setFrequency] = useState("7")
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')

  // Table data
  const columns = [
    {
      title : 'Date',
      dataIndex : 'date',
      render : (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title : 'Amount',
      dataIndex : 'amount'
    },
    {
      title : 'Type',
      dataIndex : 'type'
    },
    {
      title : 'Category',
      dataIndex : 'category'
    },
    {
      title : 'Reference',
      dataIndex : 'reference'
    },
    {
      title : 'Actions'
    }
  ]

  // useEffect hook to fetch all transactions
  useEffect(() => {
    // Get All transactions
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoader(true)
        const encodedUserId = encodeURIComponent(user._id)
        const result = await axios.post(`${SERVER_URL}/transactions/get-all-transactions`, 
        {
          userId: encodedUserId,
          frequency,
          selectedDate,
          type
        })
        setLoader(false)
        setAllTransactions(result.data.transactions)
      } catch (error) {
        setLoader(false)
        message.error('Failed to fetch all transactions')
      }
    }

    getAllTransactions()
  }, [frequency, selectedDate, type])

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoader(true)
      await axios.post(addTransaction, {...values, userId : user._id})
      setLoader(false)
      message.success('Transaction added successfully')
      setShowModal(false)
    } catch (error) {
      setLoader(false)
      message.error('Failed to add transaction')
    }
  }

  return (
    <Layout>
      {loader && <Spinner />}
        <div className='filters'>
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={value => setFrequency(value)}>
              <Select.Option value = "7">Last 1 Week</Select.Option>
              <Select.Option value = "30">Last 1 Month</Select.Option>
              <Select.Option value = "365">Last 1 Year</Select.Option>
              <Select.Option value = "custom">Custom</Select.Option>
            </Select>
            {' '}
            <Space direction="vertical" size={12}>
              {frequency === 'custom' && <RangePicker value = {selectedDate} onChange={(values)=> setSelectedDate(values)}/>}
            </Space>
            {/* {frequency === 'custom' && <RangePicker value = {selectedDate} onChange={(values)=> setSelectedDate(values)} />} */}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={value => setType(value)}>
              <Select.Option value = "all">All</Select.Option>
              <Select.Option value = "income">Income</Select.Option>
              <Select.Option value = "expense">Expense</Select.Option>
            </Select>
            {' '}
          </div>
          <div className='switch-icons'>
              <UnorderedListOutlined 
              className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} 
              onClick={()=> setViewData('table')}/>
              <AreaChartOutlined 
              className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
              onClick = {()=> setViewData('analytics')}/>
          </div>
          <div>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
          </div>
        </div>
        <div className="content">
          { viewData === 'table' ? 
          <Table columns = {columns} dataSource={allTransactions} />
          : <Analytics allTransactions={allTransactions}/>
          }
        </div>
        <Modal 
          title="Add transaction"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name = "amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">TAX</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name = "date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name = "reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name = "description">
              <Input type="text" />
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <button className='btn btn-primary' type='submit'>
                {' '}
                SAVE
                </button>
            </div>
          </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage