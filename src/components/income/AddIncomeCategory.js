import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { opensnackbar_ } from "../../features/appController/QuickFunctions"
import { selectUser } from "../../features/user/UserSlice"

import firebase from 'firebase/compat/app';
import { Loader } from "uiw"
import { CardHeader, MotionButton } from "../MotionButton"
import { StrongLabel } from "../LoaderLabel"
import { MenuItem, Select } from "@material-ui/core"
import { updateIncomesInStore } from "../../Functions"
import { db } from "../../app/firebaseConfig"


function AddIncomeCategory({ editingIncomeCategory, incomeCategoryID, editingIncome, incomeID }) {

  const [incomeCategories, setIncomeCategories] = useState([])

  const [categoryName, setCategoryName] = useState('')
  const [incomeCategory, setIncomeCategory] = useState('')
  const [incomeSource, setIncomeSource] = useState('')
  const [incomeAmount, setIncomeAmount] = useState('')
  const [dateReceived, setDateReceived] = useState('')
  const [savingCat, setSavingCat] = useState(false)
  const [savingIncome, setSavingIncome] = useState(false)

  const user = useSelector(selectUser)
  const dispatch = useDispatch()


  const saveIncomeCategory = () => {
    setSavingCat(true)
    if (categoryName === '') {
      setSavingCat(false)
      opensnackbar_(dispatch, true, 'warning', 'Category name missing')
    }
    else {

      const income = {
        userID: user?.userID,
        categoryName,
        incomeSources: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }

      if (editingIncomeCategory === true) {
        db.collection('incomeCategories').doc(incomeCategoryID).update(income).then(() => {
          setSavingCat(false)
          opensnackbar_(dispatch, true, 'success', 'Income category updated')
          updateIncomesInStore(dispatch, user?.userID)
        }).catch(err => {
          opensnackbar_(dispatch, true, 'error', 'Income category updating failed')
        })
      }
      else {

        db.collection('incomes').add({
          ...income
        }).then(() => {

          // db.collection('users').doc(user?.userID).update({
          //   todos: firebase.firestore.FieldValue.increment(1)
          // })
          updateIncomesInStore(dispatch, user?.userID)
          setCategoryName('')
          setSavingCat(false)
          opensnackbar_(dispatch, true, 'success', 'Income category added successfully')

        }).catch(error => opensnackbar_(dispatch, true, 'error', 'Technical error, income category could not be saved'))
      }

    }

    // updateIncomesInStore(dispatch, user?.userID)

  }

  const saveIncome = () => {
    setSavingIncome(true)
    if (incomeCategory === '' || incomeSource === '' || incomeAmount === '') {
      // alert('Some field values are missing, consider adding them first.')
      setSavingIncome(false)
      opensnackbar_(dispatch, true, 'warning', 'Some field values are missing')
    }
    else {
      const income = {
        userID: user?.userID,
        incomeCategory,
        incomeSource,
        incomeAmount,
        dateReceived,
        createdAt: firebase.firestore.Timestamp.now()
      }

      db.collection('incomes').doc(incomeCategory).update({
        incomeSources: firebase.firestore.FieldValue.arrayUnion(income)
      }).then((snapshot) => {
        // db.collection('users').doc(user?.userID).update({
        //   todos: firebase.firestore.FieldValue.increment(1)
        // })
        setIncomeCategory('')
        setIncomeSource('')
        setIncomeAmount('')
        setSavingIncome(false)
        opensnackbar_(dispatch, true, 'success', 'Income successfully saved')

      }).catch(error => opensnackbar_(dispatch, true, 'error', `Could not save income, some error occured ${error}`))

    }
    updateIncomesInStore(dispatch, user?.userID)

  }

  useEffect(() => {
    db.collection('incomes').onSnapshot(snapshot => {
      setIncomeCategories(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().categoryName
        }))
      )
    })
  }, [])

  return (
    <div>
      <div className="common-card p-2 my-3">
        <CardHeader title="Add new income category" />
        <div className="row my-3">
          <div className="col-md-6 col-6">
            <input value={categoryName} onChange={e => setCategoryName(e.target.value)} className="form-control input_ shadow-none py-2" placeholder="Web design" />
          </div>
          <div className="col-md-6 col-6 d-flex">
            <MotionButton title="Add category" handler={saveIncomeCategory} />
            {
              savingCat && <Loader size='large' />
            }
          </div>
        </div>

      </div>

      <div className="common-card my-3 p-2">
        <CardHeader title="Add income" />
        <div className="row">

          <div className="col-md-6 col-6 my-2">

            <StrongLabel title="Select category" />
            <Select className="form-control shadow_none input_" disableUnderline value={incomeCategory} onChange={e => setIncomeCategory(e.target.value)}>
              {
                incomeCategories.map((category, index) => (
                  <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                ))
              }
            </Select>

          </div>

          <div className="col-md-6 col-6 my-2">

            <StrongLabel title="Source name" />
            <input value={incomeSource} onChange={e => setIncomeSource(e.target.value)} className="form-control input_ shadow-none py-2" placeholder="Learners..." />
          </div>

          <div className="col-md-6 col-6 my-2">
            <StrongLabel title="Amount" />
            <input value={incomeAmount} onChange={e => setIncomeAmount(e.target.value)} type="number" className="form-control input_ shadow-none py-2" placeholder="20000" />
          </div>

          <div className="col-md-6 col-6 my-2">
            <StrongLabel title="Date received" />
            <input type='datetime-local' value={dateReceived} onChange={e => setDateReceived(e.target.value)} className="form-control input_ shadow-none py-2" />
          </div>

          <div className="col-md-6 col-6 my-2 d-flex align-items-end justify-content-between">
            <MotionButton title="Add income" handler={saveIncome} />
            {
              savingIncome && <Loader size='large' />
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default AddIncomeCategory