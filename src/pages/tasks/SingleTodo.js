import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';

import { IoPencilSharp } from 'react-icons/io5';
import { selectAppState } from '../../features/appController/AppSlice';

import { openModal } from '../../features/appController/AppSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomPortalPage from '../../components/CustomPortal';

import AddTask from '../../components/tasks/AddTask'
import { LoaderComponent } from '../../components/LoaderLabel';
import PageHolder from '../../components/page/PageHolder';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';
import { CardHeader } from '../../components/MotionButton';

import SingleDetails from '../../components/SingleDetail';
import SingleSubToDo from '../../components/tasks/SingleSubToDo';
import { DeleteUpdateIcons } from '../budgets/SingleBudget';
import { stringReplacer } from '../../Functions';


function SingleTask() {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  const { tasks } = useSelector(selectAppState)

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const id = params?.id;
    const task = tasks.find(task => task.id === id)
    setTask(task)
    setLoading(false)

  }, [params, tasks])

  const update = () => {
    navigate(`/tasks/update/${task.id}/${stringReplacer(task.title).replace(" ", "-")}/`)
  }

  return (
    <CustomPortalPage title={task?.title} button_={
      <div className='d-flex'>
        <DeleteUpdateIcons deleteFunc={update} updateFunc={update} />
      </div>
    }>

      {
        loading && loading === true ?
          <LoaderComponent />
          :
          <div>
            {/* <PageHeader page_title={task?.title} icon={<IoPencilSharp />} click={editTask} /> */}

            <div className="common-card p-2 my-3">
              <CardHeader title="Meta data" />

              <SingleDetails title="Date created" value={`${task?.createdAt !== null && new Date(task.createdAt.seconds * 1000).toLocaleDateString()}`} />

              <SingleDetails title="State" value={task?.state} />
              <SingleDetails title="Note" value={task?.desc} />

            </div>

            <div className="w-100 my-2">

              <div className="common-card p-2">
                <CardHeader title="ToDos" />

                {
                  task?.subTodos.map((subtodo, index) => {
                    return (
                      <SingleSubToDo key={index} subtodo={subtodo} />
                    )
                  })
                }

              </div>

            </div>
          </div>
      }
    </CustomPortalPage>
  )
}

export default SingleTask
