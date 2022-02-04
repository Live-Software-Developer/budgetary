import React, { useState, useEffect } from 'react'
import { FaPen, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { DataGrid } from '@mui/x-data-grid'
import { openModal } from '../../features/appController/AppSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppState } from '../../features/appController/AppSlice';
import CustomPortalPage from '../../components/CustomPortal'
import AddBudgetReacreated from '../../components/budgets/AddBudgetReacreated'
import { LoaderComponent } from '../../components/LoaderLabel'
import { CardHeader } from '../../components/MotionButton'

import SingleDetails from '../../components/SingleDetail'
import { SpeedDialAction, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Button, IconButton } from '@material-ui/core'


function SingleBudget() {
  const params = useParams()
  const [budget, setBudget] = useState(null)
  const [loading, setLoading] = useState(true)
  const { budgets } = useSelector(selectAppState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const id = params?.id;

    const budget_ = budgets.find(budget => budget.id === id)
    setBudget(budget_)
    setLoading(false)

  }, [budgets, params])


  const update = () => {
    navigate(`/budgets/update/${budget.id}/${budget.title}/`)
  }

  return (
    <CustomPortalPage title={budget?.title} button_={
      <div className='d-flex'>
        <DeleteUpdateIcons deleteFunc={update} updateFunc={update} />
      </div>
    }>
      {
        loading && loading === true ? (
          <LoaderComponent />
        )

          :

          (
            <div>

              <div className="p-2 my-3 common-card" style={{ position: 'relative' }}>
                <CardHeader title="Meta data" />
                <SingleDetails title="Date created" value={budget?.creationDate} />
                <SingleDetails title="Due date" value={budget?.dueDate} />
                <SingleDetails title="State" value={budget?.state} />
                <SingleDetails title="Note" value={budget?.budgetDescription} />
                <SingleDetails title="Budgeted" value={budget?.budgeted} />
                <SingleDetails title="Actual" value={budget?.actual} />
                <SingleDetails title="Difference/ Variance" value={budget?.difference} />

              </div>

              <div className="common-card p-2 my-3">
                <CardHeader title="Budget items" />
                <div className="w-100 " style={{ height: '380px' }}>

                  {/* <DataGrid columns={budget?.budgetHeaders || []} rows={budget?.budgetItems || []} pageSize={5} /> */}

                  <BudgetTable budgetItems={budget.budgetItems} />

                </div>

              </div>

            </div>

          )
      }
    </CustomPortalPage>
  )
}

export const DeleteUpdateIcons = ({ deleteFunc, updateFunc }) => {

  return (
    <>
      <IconButton onClick={updateFunc} className='bg-primary text-white custom-circle-btn mx-2'>
        <FaPencilAlt size={16} />
      </IconButton>
      <IconButton onClick={deleteFunc} className='bg-danger text-white custom-circle-btn'>
        <FaTrash size={16} />
      </IconButton>
    </>
  )
}

export const BudgetTable = ({ budgetItems }) => {

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell >Particular/ Description</TableCell>
            <TableCell >Budgeted</TableCell>
            <TableCell >Actual</TableCell>
            <TableCell >Difference</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            budgetItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.part}</TableCell>
                <TableCell>{item.budgeted}</TableCell>
                <TableCell>{item.actual}</TableCell>
                <TableCell>{item.difference}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SingleBudget
