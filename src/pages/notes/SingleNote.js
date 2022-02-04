import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { selectAppState } from '../../features/appController/AppSlice';
import CustomPortalPage from '../../components/CustomPortal';
import { LoaderComponent } from '../../components/LoaderLabel';
import { CardHeader } from '../../components/MotionButton';

import SingleDetails from '../../components/SingleDetail';
import { DeleteUpdateIcons } from '../budgets/SingleBudget';
import { stringReplacer } from '../../Functions';


function SingleNote() {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  const { notes } = useSelector(selectAppState)

  const params = useParams()


  const id = params?.id;

  const navigate = useNavigate()

  useEffect(() => {
    const note = notes.find(note => note.id === id)
    setNote(note)
    setLoading(false)

  }, [id, notes, params])

  const update = () => {
    navigate(`/notes/update/${note.id}/${stringReplacer(note.title)}/`)
  }

  return (
    <CustomPortalPage title={note?.title} button_={
      <div className='d-flex'>
        <DeleteUpdateIcons deleteFunc={update} updateFunc={update} />
      </div>
    }>
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
