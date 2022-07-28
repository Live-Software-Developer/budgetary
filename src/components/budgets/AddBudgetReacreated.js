import React, { useState, useEffect } from 'react'
import { IconButton, MenuItem, Select } from '@material-ui/core';
import { db, addDoc, updateDoc, serverTimestamp, collection, doc } from '../../app/firebaseConfig'

import { Loader, Switch } from 'uiw';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../features/user/UserSlice'
import { opensnackbar_ } from '../../features/appController/QuickFunctions';
import { getSingleDoc, updateBudgetsInStore } from '../../Functions';
import { IoTrashBinSharp } from 'react-icons/io5';

import ReactFlipMove from 'react-flip-move'
import { CardHeader, MotionButton } from '../MotionButton';
import { StrongLabel } from '../LoaderLabel';
import { BudgetTable } from '../../pages/budgets/SingleBudget';



function AddBudgetReacreated({ editing, budgetID }) {

  const budgetHeaders = [
    { field: 'id', type: 'number', headerName: 'ID', flex: 0.2 },
    { field: 'part', type: 'string', headerName: 'Particular/Description', flex: 1 },
    { field: 'budgeted', type: 'number', headerName: 'Budgeted Amt', flex: 0.5 },
    { field: 'actual', type: 'number', headerName: 'Actual Amt', flex: 0.5 },
    { field: 'difference', type: 'number', headerName: 'Difference/Variance', flex: 0.5 },
  ]

  const user = useSelector(selectUser)
  const dispatch = useDispatch()


  const [budgetTitle, setBudgetTitle] = useState('')
  const [budgetState, setBudgetState] = useState('')
  const [budgetDescription, setBudgetDescription] = useState('')
  const [budgetCreationDate, setBudgetCreationDate] = useState('')
  const [budgetDueDate, setBudgetDueDate] = useState('')

  const [budgetDetails, setbudgetDetails] = useState([])
  const [singleDetail, setSingleDetail] = useState({})

  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  const [budgeted, setBudgeted] = useState(0)
  const [actual, setActual] = useState(0)
  const [difference, setDifference] = useState(0)

  const clearBudget = () => {
    setSaving(false)
    setbudgetDetails([])
    setBudgetTitle('')
    setBudgetDescription('')
    setBudgetCreationDate('')
    setBudgetDueDate('')
    setBudgetState('')

  }

  const makeHeaderPositionsBasedonIndex = () => {
    let headers = budgetHeaders.map((header, index) => {
      return { ...header, position: index }
    })
    return headers
  }

  // Calculate budgeted amount from budget details
  const calculateBudgetedAmount = () => {
    let budgeted = 0
    budgetDetails.map(detail =>
      budgeted += parseFloat(detail.budgeted)
    )

    if (isNaN(budgeted)) {
      budgeted = 0
    }
    return budgeted
  }

  // Calculate actual amount total from budget details
  const calculateActualAmount = () => {
    let actual = 0
    budgetDetails.map(detail =>
      actual += parseFloat(detail.actual)
    )
    if (isNaN(actual)) {
      actual = 0
    }
    return actual
  }

  // Calculate difference amount total from budget details
  const calculateDifferenceAmount = () => {
    let difference = 0
    budgetDetails.map(detail =>
      difference += parseFloat(detail.difference)
    )
    if (isNaN(difference)) {
      difference = 0
    }
    return difference
  }

  // Calculate difference amount for each budget detail
  const calculateDifferenceAmountForDetail = (detail) => {
    let difference = 0
    if (detail.budgeted && detail.actual) {
      difference = parseFloat(detail.budgeted) - parseFloat(detail.actual)

      detail.difference = difference * -1
    }
    else {
      detail.difference = ' '
    }

    setbudgetDetails([...budgetDetails])
    return difference
  }

  const handleChange = (budgetIndex, value, key) => {
    let newBudgetDetails = [...budgetDetails]
    newBudgetDetails[budgetIndex][key] = value;
    setbudgetDetails(newBudgetDetails)
    calculateDifferenceAmountForDetail(newBudgetDetails[budgetIndex])
    setBudgeted(calculateBudgetedAmount())
    setActual(calculateActualAmount())
    setDifference(calculateDifferenceAmount())
  }

  const removeItem = (id) => {
    const arr = budgetDetails
    const arr_ = arr.filter(item => item.id !== id)
    setbudgetDetails(arr_)
    console.log(id, ' - deleted')
  }

  const makeInputs = (obj, objIndex) => {

    let class_ = '';
    const keys = ['part', 'budgeted', 'actual', 'difference']

    if (keys.length <= 2) {
      class_ = 'col-md-6 col-sm-6'
    }

    else {
      class_ = 'col-md-4 col-sm-4'
    }

    return (
      <div className="common-card p-1 my-2">
        <div className="row h-100">
          <div className="col-md-1 col-sm-1 d-flex align-items-center justify-content-center">
            <strong>{obj.id}</strong>
          </div>
          <div className="col-md-10 col-sm-10">

            <div className="row">
              {
                keys.map((key, index) => {
                  const budgetHeader = budgetHeaders.find(header => header.field === key)
                  return (
                    <div key={`_${index}`} className={class_ + ' my-2'}>
                      <StrongLabel title={budgetHeader.headerName} />
                      {
                        budgetHeader.type === 'boolean' ?
                          <div className="d-flex justify-content-between px-1">
                            <div className="text-capitalize"> {key}</div>
                            <Switch checked={obj[key]} onChange={e => handleChange(objIndex, e.target.checked, key)} />
                          </div>
                          :
                          (
                            <div>
                              {
                                key === 'difference' ?
                                  (
                                    <input key={index} disabled type={budgetHeaders[index + 1].type} value={`${obj[key]}`} onChange={e => handleChange(objIndex, e.target.value, key)} className="form-control input_ shadow-none text-dark" placeholder={key} />
                                  )
                                  :
                                  (
                                    <input key={index} type={budgetHeaders[index + 1].type} value={`${obj[key]}`} onChange={e => handleChange(objIndex, e.target.value, key)} className="form-control input_ shadow-none text-dark" placeholder={key} />
                                  )
                              }
                            </div>
                          )
                      }

                    </div>
                  )
                })
              }
            </div>

          </div>
          <div className="col-md-1 col-sm-1 d-flex align-items-center justify-content-center">
            <IconButton className="default-color" onClick={e => removeItem(obj.id)}>
              <IoTrashBinSharp size={18} />
            </IconButton>
          </div>

        </div>
      </div>
    )
  }

  const makeSingleDetail = () => {
    let detail = { id: '' }

    budgetHeaders.map((header, index) =>
      detail[header.headerName.toLocaleLowerCase().replaceAll(' ', '_')] = ''
    )
    setSingleDetail(detail)

  }

  const addSingleDetail = () => {

    const budget_details = [...budgetDetails];
    const detail = { id: '', part: '', budgeted: '', actual: '', difference: '' };

    let id_;
    if (budget_details.length === 0) {
      id_ = 1
    }
    else if (budget_details.length > 0) {
      id_ = [...budget_details].pop().id + 1
    }

    detail.id = id_
    budget_details.push(detail)
    setbudgetDetails(budget_details)
  }



  const saveBudget = () => {

    if (budgetTitle === '' || budgetState === '' || budgetDueDate === '' || budgetDetails.length === 0) {
      opensnackbar_(dispatch, true, 'warning', 'Some field values are missing')
    }
    else {
      // const budgetHeadersToSave = makeHeaderPositionsBasedonIndex()
      const userID = user?.userID
      const budget = {
        userID: userID,
        title: budgetTitle,
        state: budgetState,
        creationDate: budgetCreationDate,
        dueDate: budgetDueDate,
        budgetHeaders: budgetHeaders,
        budgetItems: budgetDetails,
        budgetDescription: budgetDescription,
        budgeted: budgeted,
        actual: actual,
        difference: difference,
        createdAt: serverTimestamp()
      }
      if (editing) {
        const doc__ref = doc(db, `budgets/${budgetID}`);
        updateDoc(doc__ref, budget).then(fulfilled => {
          opensnackbar_(dispatch, true, 'success', 'Budget updated successfully')
          updateBudgetsInStore(dispatch, userID)
        }).catch(err => {
          opensnackbar_(dispatch, true, 'error', 'Updating budget failed')
        })
      }
      else {
        addDoc(collection(db, 'budgets'), budget).then(fallback => {
          opensnackbar_(dispatch, true, 'success', 'Budget successfully saved')
          clearBudget()
          updateBudgetsInStore(dispatch, user.userID)
        }).catch(err => {
          opensnackbar_(dispatch, true, 'error', `An error occured while trying to save the budget ${err}`)
        })

      }
    }
  }

  useEffect(() => {
    if (editing) {

      getSingleDoc('budgets', budgetID).then(doc => {
        if (doc) {

          const budget = doc.data()
          console.log('BUDGET', budget)
          setBudgetTitle(budget.title)
          setBudgetState(budget.state)
          setBudgetCreationDate(budget.creationDate)
          setBudgetDueDate(budget.dueDate)
          setBudgetDescription(budget.budgetDescription)
          setbudgetDetails(budget.budgetItems)
        }
      })
    }
  }, [budgetID, editing])

  return (
    <div className="w-100 align-content-start">
      <form>
        <div className="common-card p-2">
          <CardHeader title="Budget meta data" />
          <div className="row">
            <div className="col-6 my-2">
              <StrongLabel title="Budget Title" />
              <input className="form-control shadow-none input_" value={budgetTitle} onChange={e => setBudgetTitle(e.target.value)} />
            </div>

            <div className="col-6 my-2">
              <StrongLabel title="Budget State" />
              <Select className="form-control shadow-none input_ p-0" disableUnderline value={budgetState} onChange={e => setBudgetState(e.target.value)}>
                <MenuItem value="">Select state</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </Select >
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 my-2">
              <StrongLabel title="Creation Date" />
              <input type="date" className="form-control shadow-none input_" value={budgetCreationDate} onChange={e => setBudgetCreationDate(e.target.value)} />
            </div>

            <div className="col-md-6 my-2">
              <StrongLabel title="Budget Due Date" />
              <input type="date" className="form-control shadow-none input_" value={budgetDueDate} onChange={e => setBudgetDueDate(e.target.value)} />
            </div>
          </div>

          <div className="col-12 my-2">
            <StrongLabel title="Budget Description" />
            <textarea className="form-control shadow-none input_" rows={5} value={budgetDescription} onChange={e => setBudgetDescription(e.target.value)} />
          </div>

        </div>

        <div className="my-3">


          <div className="common-card p-2 my-2">
            <CardHeader title="Budget items" />
            {
              budgetDetails.length === 0 &&
              <div className="text-center my-2 p-3">
                No budget items found.
              </div>
            }

            <ReactFlipMove>
              {
                budgetDetails.map((budget, budgetIndex) => {
                  return (
                    <div key={budget.id}>
                      {makeInputs(budget, budgetIndex)}
                    </div>
                  )
                })
              }
            </ReactFlipMove>

            <div className="row mt-3">
              <div className="col-md-3 my-2">
                <h6 className="p-0 m-0"><strong>Budgeted</strong>: {budgeted}</h6>
              </div>
              <div className="col-md-3 my-2">
                <h6 className="p-0 m-0"><strong>Actual</strong>: {actual}</h6>
              </div>
              <div className="col-md-3 my-2">
                <h6 className="p-0 m-0"><strong>Difference</strong>: {difference}</h6>
              </div>
              <div className='col-md-3 my-2'>
                <MotionButton title="Add budget item" handler={e => addSingleDetail()} />
              </div>
              <div className='col-md-3 my-2'>
                <MotionButton title="Preview items" handler={e => setPreview(current => !current)} />
              </div>
            </div>

          </div>
          {
            preview &&
            <div className="common-card p-2">
              <div className="row mt-3">
                <div className="col">
                  <h3>Budget Preview</h3>
                  <div className="w-100" >
                    {/* {
                      JSON.stringify(budgetDetails)
                    } */}
                    <BudgetTable budgetItems={budgetDetails} />
                  </div>
                </div>
              </div>
            </div>

          }
          <div className="container py-3 d-flex justify-content-center">
            <MotionButton title={editing ? 'Update Budget' : 'Save Budget'} handler={saveBudget} />
            {
              saving && <Loader size="large" className="ml-3" />
            }
          </div>

        </div>
      </form>

    </div>
  )
}

export default AddBudgetReacreated
