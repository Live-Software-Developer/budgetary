import React, { useState } from 'react'
import Navlink from './Navlink'
import * as FaIcons from 'react-icons/fa';
import { IconButton } from '@material-ui/core';
import { Popover, Drawer } from 'uiw';
import ProfileNavPopover from './ProfileNavPopover';
import { navigationLinks } from './Navigation';
import { LeftSidebarFooter, LeftSidebarHeader, LeftSidebarMenuNew } from './LeftSidebar';
import { IoChevronBackSharp, IoPersonOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/UserSlice';

function Navbar() {
  const user = useSelector(selectUser)

  const [draweOpen, setDrawerOpen] = useState(false)

  const openDrawer = () => {
    setDrawerOpen((current) => !current)
  }



  return (
    <div className="h-80">
      <div className="navbar  elevation-2 w-100 fixed-top h-70 bg-theme-color">

        <div className="row w-100 mx-auto h-100">

          <div className="col-md-2 col-sm-12 p-0 m-0 h-100 d-flex justify-content-between">
            <div className="d-flex align-content-center  h-100">
              <IconButton onClick={openDrawer} className="d-md-none">
                <IoChevronBackSharp />
              </IconButton>
              <h4 className="text-uppercase my-auto mx-3">
                budgetary
              </h4>
            </div>
            <div className="d-md-none">
              <IconButton onClick={openDrawer} >
                <FaIcons.FaBars />
              </IconButton>
            </div>
          </div>

          <div className="col-md-8">

            {
              user && (
                <div className="d-flex justify-content-between d-none d-md-flex w-wrap">
                  {
                    navigationLinks.map((link, index) => {
                      return (<Navlink key={index} title={link.title} icon={link.icon} to={link.to} />)
                    })
                  }
                </div>
              )
            }

          </div>

          <div className="col-md-2 position-relative d-none d-md-block">
            <div className="d-flex  align-content-center justify-content-end position-relative">

              <Popover content={<ProfileNavPopover />} className="nav-popover" placement='bottomRight' trigger='click' visibleArrow={false}>
                <IconButton className="mx-2">
                  <IoPersonOutline />
                </IconButton>
              </Popover>

            </div>
          </div>

        </div>

      </div>

      <Drawer isOpen={draweOpen} className="p-1 drawer d-md-none" placement='left' onClose={openDrawer}>
        <div className="header">
          {/* <div>
            <h2 className="text-center">BUDGETARY</h2>
          </div> */}
          <LeftSidebarHeader sidebar={openDrawer} />

        </div>
        <div className="body">
          <LeftSidebarMenuNew sidebar={openDrawer} />
        </div>
        <div className="footer">
          <LeftSidebarFooter />
        </div>
      </Drawer>



    </div>
  )
}

export default Navbar
