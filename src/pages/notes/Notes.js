import React from 'react'
import { useSelector } from 'react-redux';
import { IoCreateOutline } from 'react-icons/io5';
import { Outlet } from 'react-router';
import { selectAppState } from '../../features/appController/AppSlice';
import PageHolder from '../../components/page/PageHolder';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';
import DashboardPreviewRow from '../../components/dashboard/DashboardPreviewRow';
function Notes() {

  const { notes } = useSelector(selectAppState)

  return (
    <PageHolder>
      <PageHeader page_title="Notes" link_to="add-note/" icon={<IoCreateOutline />} />

      <PageBody>
        {
          notes.length === 0 && (
            <div className="d-flex justify-content-center p-4 m-4">
              No Notes found
            </div>
          )
        }
        {
          notes.length > 0 &&
          <DashboardPreviewRow inputs_={notes} type="notes" full_description={true} />
        }

      </PageBody>
      <Outlet />
    </PageHolder>
  )
}

export default Notes
