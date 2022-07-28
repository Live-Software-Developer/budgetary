import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAppState } from '../../features/appController/AppSlice';
import CustomPortalPage from '../../components/CustomPortal';
import { LoaderComponent } from '../../components/LoaderLabel';
import { CardHeader } from '../../components/MotionButton';
import SingleDetails from '../../components/SingleDetail';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DeleteUpdateIcons } from '../budgets/SingleBudget';

function SingleExpense() {

  const [expense, setExpense] = useState(null)
  const [loading, setLoading] = useState(true)
  const { expenses } = useSelector(selectAppState)
  const params = useParams()
  const navigate = useNavigate()

  const update = () => {
    navigate(`/expenses/update/${expense.id}/${expense.date}/`)
  }

  useEffect(() => {
    const id = params.id;
    setExpense(expenses.find(expense => expense.id === id))
    setLoading(false)
  }, [expenses, params])

  return (
    <CustomPortalPage title={expense?.date} button_={
      <div className='d-flex'>
        <DeleteUpdateIcons deleteFunc={update} updateFunc={update} />
      </div>
    }>
      <div>
        {
          loading === true ?
            <LoaderComponent />
            :

            <div>
              <div className="p-2  mt-3 common-card ">
                <CardHeader title="Meta data" />
                <SingleDetails title="Date created" value={expense?.date} />
                <SingleDetails title="Target Date" value={expense?.date} />
                <SingleDetails title="Note" value={expense?.dayNote || "No notes"} />
                <SingleDetails title="Total" value={expense?.expenseTotal} />

              </div>

              <div className="common-card p-2 my-3">
                <CardHeader title="Expenses list" />
                {
                  expense && <ExpenseTable expenseItems={expense.expenseItems} />
                }
              </div>
            </div>
        }
      </div>
    </CustomPortalPage>
  )
}

export const ExpenseTable = ({ expenseItems }) => {

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell >Particular/ Description</TableCell>
            <TableCell >Quantity</TableCell>
            <TableCell >Price/Unit</TableCell>
            <TableCell >Total</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            expenseItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.part}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.pu}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SingleExpense
