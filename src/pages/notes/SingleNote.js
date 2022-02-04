import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, selectAppState } from '../../features/appController/AppSlice';
import { IoPencilSharp } from 'react-icons/io5';
import CustomPortalPage from '../../components/CustomPortal';
import { LoaderComponent } from '../../components/LoaderLabel';
import { CardHeader } from '../../components/MotionButton';
import AddNote from '../../components/notes/AddNote';
import PageHolder from '../../components/page/PageHolder';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';

import SingleDetails from '../../components/SingleDetail';


function SingleNote() {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  const { notes } = useSelector(selectAppState)

  const params = useParams()

  const dispatch = useDispatch()

  const id = params?.id;

  useEffect(() => {
    const note = notes.find(note => note.id === id)
    setNote(note)
    setLoading(false)

  }, [id, notes, params])

  const editNote = () => {
    const target_ = { target: 'notes', title: 'Updating note', subtitle: 'Updating note', component: <AddNote editing={true} noteID={note.id} /> };

    dispatch(
      openModal(target_)
    )
  }
  return (
    <CustomPortalPage title={note?.title}>
      {
        loading && loading === true ?
          <LoaderComponent />
          :
          <div>
            {/* <PageHeader page_title={note?.title} icon={<IoPencilSharp />} click={editNote} /> */}
            <div className="p-2 my-3 common-card">
              <CardHeader title="Meta data" />
              <SingleDetails title="Title" value={note?.title} />
              <SingleDetails title="Date created" value="25/09/2021" />

            </div>
            <div className="w-100 common-card my-3 p-2 note-html" id="note-html">
              {
                ReactHtmlParser(note?.data, { decodeEntities: true })
              }
            </div>
          </div>
      }

    </CustomPortalPage>
  )
}

export default SingleNote
