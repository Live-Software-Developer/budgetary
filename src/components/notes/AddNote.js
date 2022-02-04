import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { db, addDoc, updateDoc, serverTimestamp, collection, doc } from '../../app/firebaseConfig'
import { opensnackbar_ } from "../../features/appController/QuickFunctions"
import { selectUser } from "../../features/user/UserSlice"
import { getSingleDoc, holderText, updateNotesInStore } from "../../Functions"
import { CardHeader, MotionButton } from "../MotionButton"

import { Loader } from "uiw"

function AddNote({ editing, noteID }) {
  const [data, setData] = useState(holderText)
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  // const history = useHistory();
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const resetInput = () => {
    setTitle('')
    setData(holderText)
    setSaving(false)
  }

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
      date_created: serverTimestamp(),
    }

    if (editing && editing === true) {

      const doc__ref = doc(db, `notes/${noteID}`);
      updateDoc(doc__ref, note).then(fulfilled => {
        setSaving(false)
        opensnackbar_(dispatch, true, 'success', 'Note updated successfully!')
        updateNotesInStore(dispatch, user.userID)
      }).catch(error => opensnackbar_(dispatch, true, 'error', `The Note was not saved. Error - ${error}`))
    }
    else {
      addDoc(collection(db, 'notes'), note).then(fallback => {
        resetInput()
        updateNotesInStore(dispatch, user.userID)
        opensnackbar_(dispatch, true, 'success', 'Note was saved successfully')
      }).catch(error => opensnackbar_(dispatch, true, 'error', `The Note was not saved. Error - ${error}`))
    }

    // updateNotesInStore(dispatch, user.userID)
  }

  useEffect(() => {
    if (editing && editing === true) {
      getSingleDoc('notes', noteID).then(doc => {
        setData(doc.data().data)
        setTitle(doc.data().title)
      })
    }

  }, [noteID, editing])


  return (
    <div className="common-card px-2 py-4 position-relative" style={{ zIndex: '20000' }}>
      <CardHeader title="Note meta data" />
      <div className="my-3">
        <label className="my-2"><strong>Note title</strong></label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="form-control shadow-none input_" placeholder="Enter note title" />
      </div>
      <div className="position-relative">
        <CKEditor editor={ClassicEditor} data={data} onChange={(event, editor) => {
          setData(editor.getData())
        }} />
      </div>
      <div className="container py-3 d-flex justify-content-center">
        <MotionButton title={editing && editing === true ? 'Update note' : 'Saving Note'} handler={saveNote} />
        {
          saving && <Loader size='large' />
        }
      </div>
    </div>
  )
}

export default AddNote;