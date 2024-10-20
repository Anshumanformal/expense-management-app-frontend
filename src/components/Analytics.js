import React from 'react'
import {Progress} from 'antd'

const Analytics = ({ allTransactions }) => {
    const totalTransactions = allTransactions.length
    const totalIncomeTransactions = allTransactions.filter(
        transaction => transaction.type === "income"
    )
    const totalExpenseTransactions = allTransactions.filter(
        transaction => transaction.type === "expense"
    )
    const totalIncomePercentage = (totalIncomeTransactions.length / totalTransactions)*100
    const totalExpensePercentage = (totalExpenseTransactions.length / totalTransactions)*100

    // Total turnover
    const totalTurnover = allTransactions.reduce(
        (accumulator, transaction) => accumulator + transaction.amount, 0
    )

    const totalIncomeTurnover = allTransactions.filter(
        transaction => transaction.type === "income"
    ).reduce((accumulator, transaction) => accumulator + transaction.amount, 0)

    const totalExpenseTurnover = allTransactions.filter(
        transaction => transaction.type === "expense"
    ).reduce((accumulator, transaction) => accumulator + transaction.amount, 0)

    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnover)*100
    const totalExpenseTurnoverPercent = (totalIncomeTurnover/totalTurnover)*100

  return (
    <>
     <div className='row m-3'>
      <div className='col-md-4'>
        <div className='card'>
            <div className='card-header'>
                Total Transactions : {totalTransactions}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>
                    Income : {totalIncomeTransactions.length}
                </h5>
                <h5 className='text-danger'>
                    Expense : {totalExpenseTransactions.length}
                </h5>
                <div>
                    <Progress 
                    type="circle" 
                    strokeColor={'green'}
                    className='mx-2'
                    percent={totalIncomePercentage.toFixed(0)}
                    />
                    <Progress 
                    type="circle" 
                    strokeColor={'red'}
                    className='mx-2'
                    percent={totalExpensePercentage.toFixed(0)}
                    />
                </div>
            </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='card'>
            <div className='card-header'>
                Total Turnover : {totalTurnover}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>
                    Income : {totalIncomeTurnover}
                </h5>
                <h5 className='text-danger'>
                    Expense : {totalExpenseTurnover}
                </h5>
                <div>
                    <Progress 
                    type="circle" 
                    strokeColor={'green'}
                    className='mx-2'
                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                    />
                    <Progress 
                    type="circle" 
                    strokeColor={'red'}
                    className='mx-2'
                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                    />
                </div>
            </div>
        </div>
      </div>
     </div>        
    </>
  )
}

export default Analytics