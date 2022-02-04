import { NavLink } from "react-router-dom"

function DashboardStat({ title, number, link_to, classes }) {
  return (
    <div className="col-md-4 my-2">
      <div className={`dashboard-stat ustify-self-center common-card ${classes}`}>
        <NavLink to={link_to ? link_to : '/'} className="nav-link">
          <h3 className="text-center py-1">{title}</h3>
        </NavLink>
        <h3 className="w-100 py-3 text-center">
          {number}
        </h3>
      </div>
    </div>
  )
}


export default DashboardStat