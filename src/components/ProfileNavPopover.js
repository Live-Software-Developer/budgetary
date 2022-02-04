import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../features/user/UserSlice'
import { SidebarLink } from './LeftSidebar'
import { IoPowerOutline, IoPersonOutline, IoCogOutline } from 'react-icons/io5';
import { selectUser } from './../features/user/UserSlice';

function ProfileNavPopover() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const logout_ = () => {
    dispatch(logout())
  }
  return (
    <div className="px-2 py-3" style={{ width: '200px' }}>

      {
        user && (
          <div>
            <SidebarLink to="/account/" icon={<IoPersonOutline size={20} className="nav-link-icon-sidebar" />} title="Account" />

            <SidebarLink to="/settings/" icon={<IoCogOutline size={20} className="nav-link-icon-sidebar" />} title="Settings" />

            <SidebarLink to="/login/" logout={logout_} icon={<IoPowerOutline size={20} className="nav-link-icon-sidebar" />} title="Logout" />
          </div>
        )
      }

      {
        !user && (
          <div>
            <SidebarLink to="/login/" icon={<IoPowerOutline size={20} className="nav-link-icon-sidebar" />} title="Login" />
          </div>
        )
      }


    </div>
  )
}

export default ProfileNavPopover
