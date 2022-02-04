import React from 'react'
import { useSelector } from 'react-redux';
import { IoLogoUsd } from 'react-icons/io5';
import { selectAppState } from '../../features/appController/AppSlice';
import { Outlet } from 'react-router';
import PageHolder from '../../components/page/PageHolder';
import PageHeader from '../../components/page/PageHeader';
import PageBody from '../../components/page/PageBody';
import DashboardPreviewRow from '../../components/dashboard/DashboardPreviewRow';

function Expenses() {
  const { expenses } = useSelector(selectAppState)

  return (
    <PageHolder>
      <PageHeader page_title="Expenses" link_to="add-expense/" icon={<IoLogoUsd />} />

      <PageBody>
        {
          expenses.length === 0 && (
            <div className="d-flex justify-content-center p-4 m-4">
              No Expenses found
            </div>
          )
        }
        {
          expenses.length > 0 &&
          <DashboardPreviewRow expenses={expenses} />
        }

      </PageBody>
      <Outlet />
    </PageHolder>
  )
}

export default Expenses
