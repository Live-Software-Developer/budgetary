import { useEffect } from 'react'
import { Button, IconButton, MenuItem, Select } from "@material-ui/core"
import { useState } from "react"
import { IoTrashBinSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Loader, Switch } from "uiw"
import { db } from "../../app/firebaseConfig"
import { opensnackbar_ } from "../../features/appController/QuickFunctions"
import { selectUser } from "../../features/user/UserSlice"
import { StrongLabel } from "../LoaderLabel"
import { CardHeader, MotionButton } from "../MotionButton"
import firebase from 'firebase/compat'
import ReactFlipMove from 'react-flip-move'
import BudgetHeader from './BudgetHeader'
import { DataGrid } from '@mui/x-data-grid'

function AddBudget({ editing, budgetID }) {

  const [budgetHeaders, setBudgetHeaders] = useState([{ field: 'id', type: 'number', headerName: 'ID', width: 90, flex: 0.2, position: 0 }])

  const [headerInput, setHeaderInput] = useState('')
  const [headerInputType, setHeaderInputType] = useState('s')
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [typeInputs, setTypeInputs] = useState([
    { type: 'number', title: 'Number' },
    { type: 'text', title: 'Text' },
    { type: 'date', title: 'Date' },
    { type: 'email', title: 'Email' },
    { type: 'url', title: 'URL' },
    { type: 'checkbox', title: 'Checkbox' }
  ])

  const [budgetTitle, setBudgetTitle] = useState('')
  const [budgetState, setBudgetState] = useState('')
  const [budgetDescription, setBudgetDescription] = useState('')
  const [budgetCreationDate, setBudgetCreationDate] = useState('')
  const [budgetDueDate, setBudgetDueDate] = useState('')

  const [budgetDetails, setbudgetDetails] = useState([])
  const [singleDetail, setSingleDetail] = useState({})

  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  // const getHeaderPositionBasedonLastHeader = () => {
  //   let lastHeader = budgetHeaders[budgetHeaders.length - 1]
  //   let position = lastHeader.position + 1
  //   return position
  // }

  const makeHeaderPositionsBasedonIndex = () => {
    let headers = budgetHeaders.map((header, index) => {
      return { ...header, position: index }
    })
    return headers
  }


  const addHeader = () => {
    const headers = [...budgetHeaders];

    if (headerInput === '' || headerInputType === 's') {
      opensnackbar_(dispatch, true, 'warning', 'Empty header fields')
      return;
    }
    else if (checkInHeaders()) {
      opensnackbar_(dispatch, true, 'warning', 'Header has already been added')
      return;
    }
    else {
      const other_field = { field: headerInput.toLowerCase().replaceAll(' ', '_'), headerName: headerInput, type: headerInputType, flex: 0.8, position: 0 }
      if (headerInputType === 'checkbox') {
        other_field.type = 'boolean'
      }
      headers.push(other_field)
      setBudgetHeaders(headers)
    }
    makeSingleDetail()
    opensnackbar_(dispatch, true, 'info', `${headerInput} header - has been added`)
    setHeaderInput('')
    setHeaderInputType('s')
  }

  const checkInHeaders = () => {
    const headers = [...budgetHeaders];
    const value = headers.find(header => header.headerName === headerInput)
    return value
  }

  const handleChange = (budgetIndex, value, key) => {
    let newBudgetDetails = [...budgetDetails]
    newBudgetDetails[budgetIndex][key] = value;
    setbudgetDetails(newBudgetDetails)
  }

  const removeItem = (id) => {
    const arr = budgetDetails
    const arr_ = arr.filter(item => item.id !== id)
    setbudgetDetails(arr_)
    console.log(id, ' - deleted')
  }

  const makeInputs = (obj, objIndex) => {

    let class_ = '';
    const keys_1 = Object.keys(obj);
    let keys_ = []

    keys_1.forEach(key => {
      const header = budgetHeaders.find(header => header.field === key)
      const key_index = keys_.findIndex(key => key === header.position)
      if (key_index !== -1) {
        keys_[key_index] = header.position
      }
    })

    const keys = [...keys_];

    keys.shift()

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
                  return (
                    <div className={class_ + ' my-2'}>
                      {/* <label>{key}</label> */}
                      {
                        budgetHeaders[index + 1].type === 'boolean' ?
                          <div className="d-flex justify-content-between px-1">
                            <div className="text-capitalize"> {key}</div>
                            <Switch checked={obj[key]} onChange={e => handleChange(objIndex, e.target.checked, key)} />
                          </div>
                          :
                          <input key={index} type={budgetHeaders[index + 1].type} value={obj[key]} onChange={e => handleChange(objIndex, e.target.value, key)} className="form-control input_ shadow-none text-dark" placeholder={key} />
                      }

                    </div>
                  )
                })
              }
            </div>

          </div>
          <div className="col-md-1 col-sm-1 d-flex align-items-center justify-content-center">
            <IconButton className="default-color">
              <IoTrashBinSharp size={18} onClick={e => removeItem(obj.id)} />
            </IconButton>
          </div>

        </div>
      </div>
    )
  }

  const makeSingleDetail = () => {


    let detail = { id: '' }

    budgetHeaders.map((header, index) => {
      detail[header.headerName.toLocaleLowerCase().replaceAll(' ', '_')] = ''
    })

    setSingleDetail(detail)

  }

  const addSingleDetail = () => {

    const budget_details = [...budgetDetails];
    const detail = { ...singleDetail }
    let id;
    if (budget_details.length === 0) {
      id = 1
    }
    else if (budget_details.length > 0) {
      id = [...budget_details].pop().id + 1
    }

    detail.id = id
    budget_details.push(detail)
    setbudgetDetails(budget_details)

  }

  const swapUp = (itemIndex) => {
    const items = [...budgetHeaders]
    const item = items[itemIndex]

    let toIndex = itemIndex - 1
    console.log(itemIndex)

    if (toIndex < 1) {
      return;
    }
    else if (toIndex > 0) {

      const item_at_previous_index = items[itemIndex - 1]
      const item_at_current_index = items[itemIndex]

      items[itemIndex] = item_at_previous_index
      items[itemIndex - 1] = item_at_current_index

    }

    setBudgetHeaders(items)

  }

  const swapDown = (itemIndex) => {
    const items = [...budgetHeaders]
    const item = items[itemIndex]

    let toIndex = itemIndex + 1

    if (toIndex > items.length) {
      return;
    }
    else if (toIndex < items.length) {

      const item_at_next_index = items[itemIndex + 1]
      const item_at_current_index = items[itemIndex]

      items[itemIndex] = item_at_next_index
      items[itemIndex + 1] = item_at_current_index

    }

    setBudgetHeaders(items)

  }

  const deleteHeaderItem = (itemIndex) => {
    const headers = [...budgetHeaders]
    headers.splice(itemIndex, 1)
    setBudgetHeaders(headers)
  }


  const saveBudget = () => {

    if (budgetTitle === '' || budgetState === '' || budgetDueDate === '' || budgetDetails.length === 0) {
      opensnackbar_(dispatch, true, 'warning', 'Some field values are missing')
    }
    else {

      const budgetHeadersToSave = makeHeaderPositionsBasedonIndex()

      const budget = {
        userID: user?.userID,
        title: budgetTitle,
        state: budgetState,
        creationDate: budgetCreationDate,
        dueDate: budgetDueDate,
        budgetHeaders: budgetHeadersToSave,
        budgetItems: budgetDetails,
        budgetDescription: budgetDescription,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }

      db.collection('budgets').add({
        ...budget
      }).then(() => {

        db.collection('users').doc(user?.userID).update({
          budgets: firebase.firestore.FieldValue.increment(1)
        }).then(() => {
          opensnackbar_(dispatch, true, 'success', 'Budget successfully saved')
        })

      }).catch(error => opensnackbar_(dispatch, true, 'error', `An error occured while trying to save the budget ${error}`))

    }

  }


  useEffect(() => {
    makeSingleDetail()
  }, [budgetHeaders])

  useEffect(() => {
    if (editing) {
      db.collection('budgets').doc(budgetID).get().then(doc => {
        if (doc.exists) {
          const budget = doc.data()
          setBudgetTitle(budget.title)
          setBudgetState(budget.state)
          setBudgetCreationDate(budget.creationDate)
          setBudgetDueDate(budget.dueDate)
          setBudgetHeaders(budget.budgetHeaders)
          setBudgetDescription(budget.budgetDescription)
          setbudgetDetails(budget.budgetItems)

        }
      })

    }
  }, [editing])



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
          <div className="common-card p-2">
            <CardHeader title="Add budget headers" />
            <div className="row">
              <div className="col-md-6">
                <div className="my-1">
                  {/* <label>Header name</label> */}
                  <input value={headerInput} onChange={e => setHeaderInput(e.target.value)} className="form-control shadow-none input_" placeholder="Header name" />
                </div>
                <div className="my-1">
                  {/* <label>Header type</label> */}
                  <Select className="form-control shadow-none input_" disableUnderline value={headerInputType} onChange={e => setHeaderInputType(e.target.value)}>
                    <MenuItem value='s'>Select header type</MenuItem>
                    {

                      typeInputs.map((type, index) => {
                        return (
                          <MenuItem key={index} value={type.type}>{type.title}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </div>
                {
                  !editing && <MotionButton title="Add header" handler={addHeader} />
                }
                {
                  editing && <Button variant='outlined' color='primary' fullWidth>You can't add headers when editing</Button>
                }
              </div>

              <div className="col-md-6">
                <ReactFlipMove>
                  {
                    budgetHeaders.map((header, index) => {
                      return (

                        <BudgetHeader key={index} buttons={index === 0 ? false : true} onebutton={index === 1 ? true : false} header={header} swapUp={e => swapUp(index)} swapDown={e => swapDown(index)} delete_func={e => deleteHeaderItem(index)} />

                      )
                    })

                  }
                </ReactFlipMove>
              </div>
            </div>

          </div>

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

            <div className="d-flex justify-content-end mt-3">
              <MotionButton title="Add budget item" handler={e => addSingleDetail()} />
              <MotionButton title="Preview items" handler={e => setPreview(current => !current)} />
            </div>

          </div>

          {
            preview &&
            <div className="common-card p-2">
              <div className="row mt-3">
                <div className="col">
                  <h3>Budget Preview</h3>
                  <div className="w-100" >
                    <DataGrid columns={budgetHeaders} rows={budgetDetails} pageSize={10}
                      rowsPerPageOptions={[10]} autoHeight={true} />
                  </div>

                </div>
              </div>
            </div>

          }

          <div className="container py-3 d-flex justify-content-center">
            <MotionButton title="Save budget" handler={saveBudget} />
            {
              saving && <Loader size="large" className="ml-3" />
            }
          </div>

        </div>
      </form>

    </div>
  )
}