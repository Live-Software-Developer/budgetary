import React, { createRef, useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { DatePicker } from 'uiw';
import { selectUser } from '../features/user/UserSlice';
import './../styles/RightSidebar.css'
import { Recent } from './Components';
import { IoBookmarkOutline, IoCreateOutline, IoLogoUsd } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { selectAppState } from './../features/appController/AppSlice';




function RightSidebar() {
  const app = useSelector(selectAppState)

  return (
    <div id="right-sidebar" className="right-sidebar" >
      <div className="right-sidebar-holder">

        {
          app && (
            <div className="right-top common-card my-2 py-3">
              <h3 className="text-center my-2 bg-white">Recent activities</h3>

              <div className="px-2">

                <Recent title="Budgets" to="/budgets/" icon={<IoBookmarkOutline size={18} className="nav-link-icon-sidebar" />} recent_activities={app?.budgets !== undefined ? app?.budgets.slice(0, 2) : []} />

                <Recent title="Expenses" to="/expenses/" icon={<IoLogoUsd size={18} className="nav-link-icon-sidebar" />} recent_activities={app?.expenses !== undefined ? app?.expenses.slice(0, 2) : []} />

                <Recent title="Tasks" to="/tasks/" icon={<FaTasks size={18} className="nav-link-icon-sidebar" />} recent_activities={app?.todos !== undefined ? app?.todos.slice(0, 2) : []} />

                <Recent title="Notes" to="/notes/" icon={<IoCreateOutline size={18} className="nav-link-icon-sidebar" />} recent_activities={app?.notes !== undefined ? app?.notes.slice(0, 2) : []} />

              </div>

            </div>
          )
        }


        <div className="right-bottom common-card mt-5">
          <h3 className="text-center my-2 py-2">Calendar</h3>
          <div className="p-3">

            <DatePicker weekday={['Sun', 'Mon', 'Tue', 'Thur', 'Fri', 'Sat', 'Sun']} monthLabel={['Jan', 'Feb', 'March', 'Apr', 'MAY', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />

          </div>
        </div>

      </div>
    </div>
  )
}

export default RightSidebar
