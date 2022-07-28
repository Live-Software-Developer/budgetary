import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'uiw'
import { selectUser } from '../features/user/UserSlice'
import { navigationLinks } from './Navigation'
import Navlink from './Navlink'
import { Button, IconButton } from '@material-ui/core'
import { IoAlertOutline, IoCogOutline, IoHelp, IoInformation, IoLogIn, IoLogInOutline, IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5'
import { FaSignInAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import useNetworkStatus from './../features/hooks/useNetworkStatus';


function LeftSidebarHeader({ sidebar }) {

  const user = useSelector(selectUser)

  return (
    <div className="left-sidebar-header incomes p-1 my-2 mx-1">

      {
        user !== null ? (
          <div className="d-flex justify-content-center flex-column align-items-center">
            <Avatar className="left-sidebar-header-avatar text-capitalize">
              {user?.displayName[0]}
            </Avatar>
            <h5 className="my-2 text-center">{user?.displayName}</h5>
            <h6 className="my-2 text-center break-word px-2" style={{ wordBreak: 'break-all' }}>
              {user?.email}
            </h6>
          </div>
        )

          :

          (
            <div className="">
              <Button fullWidth className="btn_">Login to you account</Button>
            </div>
          )
      }

    </div>
  )
}

function LeftSidebarMenu({ sidebar }) {
  const user = useSelector(selectUser)
  return (
    <div className="common-card p-3 mt-3">
      <h4>Menu</h4>

      {
        user !== null ? (
          <div className="">
            {navigationLinks.map((link, index) => {
              return (<Navlink key={index} sidebar={sidebar} title={link.title} icon={link.icon} to={link.to} />)
            })}
          </div>
        )
          :
          (
            <div>
              <Navlink title="Sign Up" icon={<FaSignInAlt />} to="/signup/" />
              <Navlink title="Login" icon={<IoLogIn />} to="/login/" />
            </div>
          )
      }


    </div>
  )
}

function SidebarLink({ to, title, icon, sidebar, logout }) {
  const closeSidebar = () => {
    if (sidebar) {
      sidebar()
    }
    if (logout) {
      logout()
    }
  }
  return (
    <div className="sidebar-link">
      {/* activeClassName="sidebar-link-active" */}
      <NavLink to={to} className="d-flex sidebar-link-a" onClick={closeSidebar}>
        <div className="">
          <IconButton>
            {icon}
          </IconButton>
        </div>
        <div className="nav-link-title align-self-center">
          {title}
        </div>
      </NavLink>
    </div>
  )
}


function LeftSidebarMenuNew({ sidebar }) {
  const user = useSelector(selectUser)
  return (
    <div className="common-card-menu mt-2 p-2">
      <h4 className="my-2 mx-2">Menu</h4>

      <div className="sidebar-links ">


        {
          user !== null ? (
            <div className="">
              {navigationLinks.map((link, index) => {
                return (
                  <SidebarLink key={index} sidebar={sidebar} to={link.to} icon={link.icon} title={link.title} />
                )
              })}
              <div className="pb-2">
                <hr />

                <SidebarLink to="/howto/" sidebar={sidebar} icon={<IoAlertOutline size={20} className="nav-link-icon-sidebar" />} title="How to" />

                <SidebarLink to="/support/" sidebar={sidebar} icon={<IoHelp size={20} className="nav-link-icon-sidebar" />} title="Support" />

                <SidebarLink to="/about/" sidebar={sidebar} icon={<IoInformation size={20} className="nav-link-icon-sidebar" />} title="About" />

                <Button fullWidth className="btn_ mt-3" onClick={e => { if (sidebar) { sidebar() } }}>Logout</Button>
              </div>
            </div>
          )
            :
            (
              <div>

                <SidebarLink to="/login/" sidebar={sidebar} icon={<IoLogInOutline size={20} className="nav-link-icon-sidebar" />} title="Login" />

                <SidebarLink to="/signup/" sidebar={sidebar} icon={<IoPersonAddOutline size={20} className="nav-link-icon-sidebar" />} title="Sign Up" />

              </div>
            )
        }

      </div>



    </div>
  )
}

function LeftSidebar({ sidebar }) {
  return (
    <div className="left-sidebar sticky-to px-md-1" style={{ bottom: '10px' }}>
      <LeftSidebarHeader sidebar={sidebar} />
      {/* <LeftSidebarConnectionStatus /> */}
      <LeftSidebarMenuNew sidebar={sidebar} />
    </div>
  )
}

function LeftSidebarConnectionStatus() {
  const status = useNetworkStatus();
  const [networkStatus, setNetworkStatus] = useState(status)
  return (
    <div className={`common-card-1 px-3 py-1 mt-2 border-${networkStatus === true ? 'success' : 'danger'}`} style={{ borderWidth: '1px', borderStyle: 'solid' }}>
      {
        networkStatus && networkStatus === true ?
          <h4 className="p-0 m-0">Connected</h4>
          :
          <h4 className="p-0 m-0">
            No connection
          </h4>
      }

    </div>
  )
}

function LeftSidebarFooter({ sidebar }) {
  return (
    <div className="left-sideba sticky-top px-md-3 d-flex align-items-center h-100">

      <div className="d-flex justify-content-between w-100 align-self-center">
        {/* activeClassName="sidebar-link-active" */}
        <NavLink to="/settings/" className="d-flex justify-content-between align-items-center sidebar-link-footer py-2 border-small">
          <div className="">
            <IoCogOutline size={22} className="ms-2 me-1" />
          </div>
          <div className="">
            <h6 className="my-auto mx-2">Settings</h6>
          </div>
        </NavLink>
        {/* exact activeClassName="sidebar-link-active" */}
        <NavLink to="/account/" className="d-flex justify-content-between align-items-center sidebar-link-footer py-2 border-small">
          <div className="">
            <IoPersonOutline size={20} className="ms-2 me-1" />
          </div>
          <div className="">
            <h6 className="my-auto mx-2">Account</h6>
          </div>
        </NavLink>

      </div>

    </div>
  )
}


export { LeftSidebarHeader, LeftSidebarMenu, LeftSidebarMenuNew, LeftSidebarFooter, SidebarLink }

export default LeftSidebar
