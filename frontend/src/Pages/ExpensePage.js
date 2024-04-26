import React from 'react'
import Header from '../components/Expenses/Header'
import ExpensesForm from '../components/Expenses/ExpensesForm';
import ExpensesList from '../components/Expenses/ExpensesList'

const ExpensePage = () => {
 return (
   <>
     <Header />
     <ExpensesForm/>
     <ExpensesList/>
   </>
 ); 
  
}

export default ExpensePage