import { useEffect, useState } from "react";
import { Loader } from "uiw";
import { MotionButton } from "../MotionButton";
import SingleSubToDo from "./SingleSubToDo";
import firebase from 'firebase/compat/app'

import ReactFlipMove from 'react-flip-move'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/UserSlice";
import { opensnackbar_ } from "../../features/appController/QuickFunctions";
import { Switch } from "uiw";
import { IconButton, MenuItem, Select } from "@material-ui/core";
import { IoTrashBin } from "react-icons/io5";
import { updateTasksInStore } from "../../Functions";
import { db } from "../../app/firebaseConfig";

function AddTask({ editing, taskID }) {
  const [title, setTitle] = useState('')
  const [state, setState] = useState('s')
  const [desc, setDesc] = useState('')
  const [subTodos, setSubTodos] = useState([]);
  const singleTodo = { id: 1, text: '', complete: false }
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const addnewSubTodo = () => {
    const newsubtodo = { ...singleTodo }
    const subtodos = [...subTodos];
    let newID;
    if (subtodos.length === 0) {
      newID = 1;
    }
    else {
      newID = [...subtodos].pop().id + 1;
    }

    newsubtodo.id = newID;
    subtodos.push(newsubtodo);
    setSubTodos(subtodos);
  }

  const handleChange = (subtodIndex, value, key) => {
    let newSubtodoItems = [...subTodos]
    newSubtodoItems[subtodIndex][key] = value;
    setSubTodos(newSubtodoItems)
  }

  const removeItem = (subtodo_id) => {
    const arr = subTodos;
    const arr_ = arr.filter(item => item.id !== subtodo_id)
    setSubTodos(arr_)
    opensnackbar_(dispatch, true, 'info', `You have removed subtodo, ID ${subtodo_id}, from the list`)
  }

  const renderSubTodo = (subtodo, index) => {

    return (
      <div className="common-card p-2 my-2">
        <div className="row h-100">
          <div className="col-10">
            <div className="row">
              <div className="col-md-6 h-100 my-2">
                {/* <label> Text </label> */}
                <input value={subtodo.text} onChange={e => handleChange(index, e.target.value, 'text')} className="form-control input_ shadow-none" placeholder="Sub ToDo text" />
              </div>
              <div className="col-md-6 d-flex justify-content-between h-100 my-auto">
                <label className="my-auto">Complete</label>
                <Switch checked={subtodo.complete} className="my-auto" value={subtodo.complete} onChange={e => handleChange(index, e.target.checked, 'complete')} />
              </div>
            </div>
          </div>
          <div className="col-2 h-100 d-flex justify-content-center my-auto">
            <IconButton className="default-color my-auto" onClick={e => removeItem(subtodo.id)}>
              <IoTrashBin size={20} />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }

  const saveTask = () => {
    setSaving(true)
    if (title === '' || state === 's' || desc === '' || subTodos.length === 0) {
      opensnackbar_(dispatch, true, 'warning', `Some field values are missing.`)
      setSaving(false)
      return;
    }
    else {
      const task = {
        userID: user?.userID,
        title,
        state,
        desc,
        subTodos,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }

      if (editing && editing === true) {
        db.collection('tasks').doc(taskID).update(task).then(() => {
          updateTasksInStore(dispatch, user.userID)
          opensnackbar_(dispatch, true, 'success', `You have updated the task.`)
          setSaving(false)
        }).catch(err => {
          opensnackbar_(dispatch, true, 'error', `Error updating the task.`)
          setSaving(false)
        }
        )
      }
      else {
        db.collection('tasks').add({
          ...task
        }).then(() => {

          db.collection('users').doc(user?.userID).update({
            tasks: firebase.firestore.FieldValue.increment(1)
          }).then(() => {
            setSaving(false)
            opensnackbar_(dispatch, true, 'success', `The task was successfully saved`)
          })

        }).catch(error => opensnackbar_(dispatch, true, 'error', `An error occurred while trying to save the task`))
      }

    }

    updateTasksInStore(dispatch, user.userID)
  }

  useEffect(() => {
    if (editing && editing === true) {
      db.collection('tasks').doc(taskID).onSnapshot(snapshot => {
        const data = snapshot.data();
        setTitle(data.title);
        setState(data.state);
        setDesc(data.desc);
        setSubTodos(data.subTodos);
      })
    }
  }, [editing, taskID])

  return (
    <div>
      <div className="common-card p-2">
        <h3><strong>Meta Data</strong></h3>

        <div className="row">

          <div className="col-md-6 my-2">
            <label className="mb-2"><strong>Title</strong></label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="form-control input_ shadow-none" placeholder="Enter task title" />
          </div>
          <div className="col-md-6 my-2">
            <label className="mb-2"><strong>State</strong></label>
            <Select className="form-control input_ shadow-none" disableUnderline={true} value={state} onChange={e => setState(e.target.value)}>
              <MenuItem value='s'>Select state</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='finished'>Finished</MenuItem>
            </Select>
          </div>

          <div className="col-md-12 my-2">
            <label className="mb-2"><strong>Task description</strong></label>
            <textarea className="form-control input_ shadow-none" value={desc} onChange={e => setDesc(e.target.value)} rows={5} placeholder="Enter task description" />
          </div>
        </div>
      </div>

      <div className="common-card px-2 py-3 mt-4 mb-3">

        <h3><strong>Task Items (ToDos)</strong></h3>

        <div className="my-3">

          {
            subTodos.length === 0 && (
              <div className="d-flex justify-content-center align-items-center">
                No Todos found. Add some
              </div>
            )
          }
          <ReactFlipMove>
            {
              subTodos.map((subtodo, index) => {
                return (
                  <div key={subtodo.id}>
                    {renderSubTodo(subtodo, index)}
                  </div>
                )
              })
            }
          </ReactFlipMove>
        </div>

        <div className="d-flex justify-content-end">
          <MotionButton title="Add todo item" handler={addnewSubTodo} />
          <MotionButton title="Preview items" handler={() => setPreview(current => !current)} />
        </div>

      </div>

      {
        preview === true &&
        <div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} duration={0.4} className="common-card mt-3 p-2">
          <h3><strong>Quick preview</strong></h3>
          {
            subTodos.length === 0 && (
              <div className="d-flex justify-content-center align-items-center my-5">
                No Todos to preview
              </div>
            )
          }
          {
            subTodos.map((subtodo, index) => {
              return (
                <SingleSubToDo key={index} subtodo={subtodo} displaybtn={false} />
              )
            })
          }
        </div>
      }


      <div className="container py-3 d-flex justify-content-center">
        <MotionButton title={editing && editing === true ? "Updating task" : "save task"} handler={saveTask} />
        {
          saving && <Loader size='large' />
        }
      </div>

    </div>
  )
}

export default AddTask