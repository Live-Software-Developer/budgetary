import React from 'react'
import { FaTasks } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAppState } from '../../features/appController/AppSlice';
import { Outlet } from 'react-router';
import PageHolder from '../../components/page/PageHolder';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';
import DashboardPreviewRow from '../../components/dashboard/DashboardPreviewRow';

function Tasks() {
  const { tasks } = useSelector(selectAppState)

  return (
    <PageHolder>
      <PageHeader page_title="Tasks" link_to="add-task/" icon={<FaTasks />} />

      <PageBody>
        {
          tasks.length === 0 && (
            <div className="d-flex justify-content-center p-4 m-4">
              No Tasks found
            </div>
          )
        }
        {
          tasks.length > 0 &&
          <DashboardPreviewRow inputs_={tasks} type="tasks" full_description={true} />
        }

      </PageBody>
      <Outlet />
    </PageHolder>
  )
}

export default Tasks
