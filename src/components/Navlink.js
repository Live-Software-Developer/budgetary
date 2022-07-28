import { IconButton } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navlink({ icon, title, to, sidebar, click }) {
  const closeSidebar = () => {
    if (sidebar) {
      sidebar()
    }
  }

  return (
    <NavLink className="nav-link d-flex align-items-center justify-content-center" onClick={e => {
      closeSidebar();
      if (click) {
        click()
      }
    }} to={to} >
      <div className="nav-link-icon">
        <IconButton>
          {icon}
        </IconButton>
      </div>
      <div className="nav-link-title">
        {title}
      </div>
    </NavLink>
  )
}

export default Navlink
