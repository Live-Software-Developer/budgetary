import { Button, IconButton } from "@material-ui/core"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { IoTrashBinSharp } from "react-icons/io5"
import { Switch, Loader } from "uiw"

import { closeModal, selectAppState } from "../../features/appController/AppSlice"
import { opensnackbar_ } from "../../features/appController/QuickFunctions"
import { getSingleDoc, updateExpensesInStore } from "../../Functions"
import { StrongLabel } from "../LoaderLabel"
import { CardHeader, MotionButton } from "../MotionButton"

import ReactFlipMove from 'react-flip-move'
import firebase from 'firebase/compat/app'
import { selectUser } from "../../features/user/UserSlice"
import { useDispatch, useSelector } from "react-redux"
import { ExpenseTable } from "../../pages/expenses/SingleExpense"

import { db, addDoc, updateDoc, serverTimestamp, collection, doc } from '../../app/firebaseConfig'
import { useNavigate } from "react-router"

function AddExpense({ editing, expenseID }) {

  const [dayNote, setDayNote] = useState('')
  const [preview, setPreview] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [total_, setTotal_] = useState('')
  const [expenseItems, setExpenseItems] = useState([])
  const [saving, setSaving] = useState(false)

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { expenses } = useSelector(selectAppState)
  const [existingDateExpenses, setExistingDateExpenses] = useState(null)

  const [expenseHeaders, setExpenseHeaders] = useState([
    { field: 'id', type: 'number', headerName: 'ID', flex: 0.3 },
    { field: 'part', type: 'text', headerName: 'Particular/Description', flex: 1, },
    { field: 'qty', type: 'text', headerName: 'Quantity', flext: 0.5, },
    { field: 'pu', type: 'text', headerName: 'Price/Unit', flex: 0.5, },
    { field: 'total', type: 'number', headerName: 'Total', flex: 0.5, }
  ])

  const singleExpenseItem = {
    id: 1,
    part: '',
    qty: '',
    pu: '',
    total: ''
  }



  const makeTotal = () => {
    let t = 0;
    expenseItems.map((item) => {
      if (item.total === '' || item.total === null) { return false; }
      else { t += parseFloat(item.total) }
    })

    setTotal_(t)
  }

  // calculate total for single expense item based on index on expense items
  const calculateTotal = (index) => {
    let total = 0;
    if (expenseItems[index].qty === '' || expenseItems[index].qty === null) return;
    if (expenseItems[index].pu === '' || expenseItems[index].pu === null) return;

    total = parseFloat(expenseItems[index].qty) * parseFloat(expenseItems[index].pu)
    expenseItems[index].total = total;
    setExpenseItems([...expenseItems])
  }


  const previewFunc = () => {
    setPreview(current => !current)
  }

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000)
  }


  const addExpenseItem = () => {


    if (existingDateExpenses) {
      let combinedExpenseItems = existingDateExpenses.expenseItems.concat(expenseItems);

      const items_ = [...combinedExpenseItems];
      const expenseItem = { ...singleExpenseItem }
      let nextID = generateRandomId();

      const itemfoundwithid = items_.find(item => item.id === nextID)
      if (itemfoundwithid) {
        nextID = generateRandomId();
      }

      expenseItem.id = nextID;
      const ne = [...expenseItems, expenseItem]
      setExpenseItems(ne);
    }

    else {

      const items = [...expenseItems];
      const expenseItem = { ...singleExpenseItem }
      let nextID;

      if (items.length === 0) {
        nextID = 1;
      }
      else if (items.length > 0) {
        nextID = [...items].pop().id + 1;
      }

      expenseItem.id = nextID;
      items.push(expenseItem);
      setExpenseItems(items);
    }

  }

  const updateDate = (e) => {
    setDate(e.target.value)
  }

  useEffect(() => {
    const findItem = () => {
      const items = [...expenses];
      const item = items.find(item => item.date === date)
      return item;
    }
    const checkItem = (d) => {
      const item = findItem(date)
      if (item) {
        setExistingDateExpenses(item)
        setExpenseItems([])
        return true;
      }
      else {
        setExistingDateExpenses(null)
        // setExpenseItems([])
        return false;
      }
    }
    if (!editing) {
      checkItem(date);
    }

  }, [date, editing, expenses])



  const handleChange = (expenseIndex, value, key) => {
    let newExpenseItems = [...expenseItems]
    newExpenseItems[expenseIndex][key] = value;
    calculateTotal(expenseIndex);
    setExpenseItems(newExpenseItems);
    makeTotal();
  }

  const removeItem = (id) => {
    const arr = expenseItems;
    const arr_ = arr.filter(item => item.id !== id)
    makeTotal();
    setExpenseItems(arr_)
  }


  const MakeInputs = (obj, objIndex) => {

    let class_ = '';
    // const keys_ = Object.keys(obj);
    const keys = ['part', 'qty', 'pu', 'total']
    // keys.shift()
    if (keys.length <= 2) {
      class_ = 'col-md-6 col-sm-6'
    }

    else {
      class_ = 'col-md-4 col-sm-4'
    }

    return (

      <div className="row h-100 my-2 common-card py-2">
        <div className="col-md-1 col-sm-1 align-self-center d-flex">
          <div className="my-auto mx-auto">
            <h5>{obj.id}</h5>
          </div>
        </div>
        <div className="col-md-10 col-sm-10">

          <div className="row p-md-2">
            {
              keys.map((key, index) => {
                const keyName = expenseHeaders.find(header => header.field === key)
                return (
                  <div key={index} className={class_ + ' my-2'}>
                    {/* <label>{keyName.headerName}</label> */}
                    <StrongLabel title={keyName.headerName} />
                    {
                      expenseHeaders[index + 1].type === 'boolean' ?
                        <div className="d-flex justify-content-between px-1">
                          <div className="text-capitalize"> {key}</div>
                          <Switch checked={obj[key]} onChange={e => handleChange(objIndex, e.target.checked, key)} />
                        </div>
                        :
                        <input key={index} type={expenseHeaders[index + 1].type} value={obj[key]} onChange={e => handleChange(objIndex, e.target.value, key)} className="form-control shadow-none text-dark input_ p-2" placeholder={keyName.headerName} />
                    }

                  </div>
                )
              })
            }
          </div>

        </div>
        <div className="col-md-1 col-sm-1 d-flex">
          <IconButton className="default-color my-auto mx-auto" onClick={e => removeItem(obj.id)}>
            <IoTrashBinSharp size={18} />
          </IconButton>
        </div>

      </div>

    )

  }

  const clearInputs = () => {
    setExpenseItems([])
    setTotal_(0)
    setDate('')
    setPreview(false)
    setSaving(false)
  }

  const saveExpense = () => {
    setSaving(true)

    if (existingDateExpenses && !editing) {
      const previousExpenseItems = [...existingDateExpenses.expenseItems];
      const newExpenseItems = [...expenseItems];
      const combinedExpenseItems = previousExpenseItems.concat(newExpenseItems);

      const previous_total = previousExpenseItems.map(item => item.total).reduce((a, b) => a + b, 0);


      const total = parseFloat(previous_total) + parseFloat(total_);
      const exp = {
        expenseItems: combinedExpenseItems,
        expenseTotal: total
      }

      const doc__ref = doc(db, `expenses/${expenseID}`);
      updateDoc(doc__ref, exp).then(fulfilled => {
        clearInputs();
        opensnackbar_(dispatch, true, 'success', 'Expense items updated Successfully')
      }).catch(err => {
        setSaving(false)
        opensnackbar_(dispatch, true, 'error', 'Error Updating Expense items')
      })

    }
    else {
      if (total_ === '' || dayNote === '' || expenseItems.length === 0 || time === '' || date === '') {
        console.log('no fields');
        setSaving(false)
        opensnackbar_(dispatch, true, 'error', 'Some field values are missing!')
        return;

      }
      else {
        const dailyExpense = {
          userID: user?.userID,
          expenseTotal: total_,
          dayNote,
          expenseHeaders,
          expenseItems,
          date: date,
          time: time,
          createdAt: serverTimestamp()
        }

        if (editing) {
          const doc__ref = doc(db, `expenses/${expenseID}`);
          updateDoc(doc__ref, dailyExpense).then(fulfilled => {
            setSaving(false)
            opensnackbar_(dispatch, true, 'success', 'Expense Updated Successfully')
          }).catch(err => {
            setSaving(false)
            opensnackbar_(dispatch, true, 'error', 'Error Updating Expense items')
          })

        }

        else {
          addDoc(collection(db, 'expenses'), dailyExpense).then(fallback => {
            setSaving(false)
            opensnackbar_(dispatch, true, 'success', 'Expense Added Successfully')
            navigate(-1)
          }).catch(error => opensnackbar_(dispatch, true, 'error', `Error Adding Expense ${error}`))
        }

      }

    }

    updateExpensesInStore(dispatch, user.userID)

  }


  useEffect(() => {
    if (editing) {

      getSingleDoc('expenses', expenseID).then(doc => {
        if (doc.exists) {

          const expense = doc.data();
          setExpenseItems(expense.expenseItems)
          setTotal_(expense.expenseTotal)
          setDayNote(expense.dayNote)
          setExpenseHeaders(expense.expenseHeaders)
          setDate(expense.date)
          setTime(expense.time)
          setExistingDateExpenses(expense)
        }
      })


    }
  }, [editing])

  useEffect(() => {
    makeTotal()
  }, [expenseItems])


  return (
    <div>
      <div className="py-3">

        <div className="common-card p-2">
          <CardHeader title="Expense meta data" />
          <div className="row">

            <div className="col-12 col-md-8 offset-md-1">
              <div className="row">
                <div className="col-12 col-md-6 my-2">
                  <label className="mb-2"> <strong>Date</strong> </label>
                  <input type="date" value={date} onChange={e => updateDate(e)} className="form-control input_ shadow-none p-2" />
                  {
                    existingDateExpenses && existingDateExpenses.expenseItems.length > 0 ? <div className="text-danger"> <strong>Note:</strong> This date already has expenses. Do you want to add to it? </div> : null
                  }
                </div>

                <div className="col-12 col-md-6 my-2">
                  <label className="mb-2"><strong>Time</strong> </label>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className="form-control input_ shadow-none p-2" />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-12 col-md-8 my-2 offset-md-1">
                <label className="mb-2"><strong>Day's note</strong> </label>
                <textarea value={dayNote} onChange={e => setDayNote(e.target.value)} className="form-control input_ shadow-none" rows={5} />
              </div>
            </div>

          </div>


        </div>

        <div>
          {
            expenseItems.length === 0 &&
            <div className="d-flex justify-content-center my-3 py-4">
              You have not added any expenses.
            </div>
          }
        </div>
        <div className="position-relative mt-4">
          <ReactFlipMove>
            {
              expenseItems.map((expense, index) => {
                return (
                  <div key={expense.id}>
                    {MakeInputs(expense, index)}
                  </div>
                )
              })
            }
          </ReactFlipMove>
        </div>
        {/* <hr className="my-2" /> */}
        <div className="d-flex justify-content-end my-3" style={{ transition: 'all 2s linear' }}>

          <Button disabled className="mx-2">
            <strong>Total: KSH {total_}</strong>
          </Button>
          <Button onClick={e => addExpenseItem()} className="budget-header mx-2">
            Add Expense item
          </Button>

          <Button onClick={e => previewFunc()} className="budget-header mx-2">
            Preview items
          </Button>

        </div>
      </div>
      {
        preview && (
          <div className="w-100" style={{ height: '350px' }}>
            <ExpenseTable expenseItems={expenseItems} />
          </div>
        )
      }
      <div className="container py-3 d-flex justify-content-center">
        <MotionButton title="Save expense" handler={saveExpense} />
        {
          saving && <Loader size="large" className="ml-3" />
        }
      </div>
    </div>
  )
}

export default AddExpense