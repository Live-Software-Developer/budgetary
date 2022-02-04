import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectAppState, openModal } from '../../features/appController/AppSlice';
import { IoPencilSharp } from 'react-icons/io5';
import CustomPortalPage from '../../components/CustomPortal';
import PageHolder from '../../components/page/PageHolder';
import { LoaderComponent } from '../../components/LoaderLabel';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';
import { CardHeader } from '../../components/MotionButton';
import SingleDetails from '../../components/SingleDetail';
import AddExpense from '../../components/expenses/AddExpense';

function SingleExpense() {

  const [expense, setExpense] = useState(null)
  const [loading, setLoading] = useState(true)
  const { expenses } = useSelector(selectAppState)
  const params = useParams()
  const dispatch = useDispatch()


  const editExpense = () => {
    const target_ = { target: 'expenses', title: 'Editing an expense', subtitle: `Editing expenditure for ${expense.date}`, component: <AddExpense editing={true} expenseID={expense.id} /> };
    console.log('editing ', expense.id)

    dispatch(
      openModal(target_)
    )

  }

  useEffect(() => {
    const id = params.id;
    setExpense(expenses.find(expense => expense.id === id))
    setLoading(false)
  }, [expenses, params])

  return (
    <CustomPortalPage title={expense?.date}>
      <div>
        {
          loading === true ?
            <LoaderComponent />
            :

            <div>
              {/* <PageHeader page_ icon={<IoPencilSharp />} click={editExpense} /> */}
              <div className="p-2  mt-3 common-card ">
                <CardHeader title="Meta data" />
                <SingleDetails title="Date created" value={expense?.date} />
                <SingleDetails title="Target Date" value={expense?.date} />
                <SingleDetails title="Total" value={expense?.expenseTotal} />

              </div>

              <div className="common-card p-2 my-3">
                <CardHeader title="Expenses list" />
                {
                  expense && <div classame="w-100" style={{ height: 'auto' }}>
                    <DataGrid columns={expense.expenseHeaders} rows={expense.expenseItems} autoHeight />
                  </div>
                }
              </div>
            </div>
        }
      </div>
    </CustomPortalPage>
  )
}

export default SingleExpense
