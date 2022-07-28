import React from 'react'
import { useSelector } from 'react-redux';
import { IoBookmarkOutline } from 'react-icons/io5';
import { selectAppState } from '../../features/appController/AppSlice';
import { Outlet } from 'react-router';
import PageHolder from '../../components/page/PageHolder';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';
import DashboardPreviewRow from '../../components/dashboard/DashboardPreviewRow';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function Budgets() {
  const { budgets } = useSelector(selectAppState)

  return (

    <PageHolder>
      <PageHeader page_title="Budgets" link_to="add-budget/" icon={<IoBookmarkOutline />} />

      <PageBody>
        {
          budgets.length === 0 && (
            <div className="d-flex justify-content-center p-4 m-4">
              No budgets found
            </div>
          )
        }
        {
          budgets.length > 0 &&
          <DashboardPreviewRow inputs_={budgets} type="budgets" full_description={true} />
        }
      </PageBody>
      <Outlet />
    </PageHolder>
  )
}

export default Budgets
