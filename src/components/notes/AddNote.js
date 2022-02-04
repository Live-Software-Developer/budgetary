import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../../app/firebaseConfig"
import { opensnackbar_ } from "../../features/appController/QuickFunctions"
import { selectUser } from "../../features/user/UserSlice"
import { holderText, updateNotesInStore } from "../../Functions"
import { CardHeader, MotionButton } from "../MotionButton"

import firebase from 'firebase/compat/app'
import { Loader } from "uiw"

function AddNote({ editing, noteID }) {
  const [data, setData] = useState(holderText)
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  // const history = useHistory();
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const saveNote = () => {
    setSaving(true)
    if (title === '') {
      opensnackbar_(dispatch, true, 'warning', 'You have not set the note title!')
      setSaving(false)
      return;
    }
    const note = {
      userID: user?.userID,
      data,
      title,
      date_created: firebase.firestore.FieldValue.serverTimestamp(),
    }

    if (editing && editing === true) {
      db.collection('notes').doc(noteID).update({
        ...note
      }).then(() => {

        setTitle('')
        setData(holderText)
        setSaving(false)
        opensnackbar_(dispatch, true, 'success', 'Note updated successfully!')
        updateNotesInStore(dispatch, user.userID)
      }).catch(error => opensnackbar_(dispatch, true, 'error', `The Note was not saved. Error - ${error}`))
    }
    else {
      db.collection('notes').add({
        ...note
      }).then(() => {

        db.collection('users').doc(user?.userID).update({
          notes: firebase.firestore.FieldValue.increment(1)
        }).then(() => {
          setTitle('')
          setData(holderText)
          setSaving(false)
          updateNotesInStore(dispatch, user.userID)
          opensnackbar_(dispatch, true, 'success', 'Note was saved successfully')
        })

      }).catch(error => opensnackbar_(dispatch, true, 'error', `The Note was not saved. Error - ${error}`))
    }

    // updateNotesInStore(dispatch, user.userID)
  }

  useEffect(() => {
    if (editing && editing === true) {
      db.collection('notes').doc(noteID).onSnapshot(snapshot => {
        setData(snapshot.data().data)
        setTitle(snapshot.data().title)
      })
    }

  }, [noteID, editing])


  return (
    <div className="common-card px-2 py-4 position-relative" style={{ zIndex: '20000' }}>
      <CardHeader title="Note meta data" />
      <div className="my-3">
        <label className="my-2"><strong>Note title</strong></label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="form-control shadow-none input_" placeHolder="Enter note title" />
      </div>
      <div className="position-relative">
        <CKEditor editor={ClassicEditor} data={data} onChange={(event, editor) => {
          setData(editor.getData())
        }} />
      </div>
      <div className="container py-3 d-flex justify-content-center">
        {/* <Button className="px-5 budget-header mx-2" onClick={saveNote}>
          <motion.div whileHover={{ scale: 1.075 }} whileTap={{ scale: 0.8 }} className='h-100'>Save note</motion.div>
        </Button> */}
        <MotionButton title={editing && editing === true ? 'Updating note' : 'Saving Note'} handler={saveNote} />
        {
          saving && <Loader size='large' />
        }
      </div>
    </div>
  )
}

export default AddNote;