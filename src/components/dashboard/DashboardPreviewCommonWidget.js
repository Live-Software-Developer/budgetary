import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const DashboardPreviewCommonWidget = forwardRef(({ budgetary_object, type, full_description }, ref) => {

  const link = `/${type}/view/${budgetary_object.id}/${budgetary_object.title?.replaceAll(' ', '-').replaceAll('/', '-')}/`;

  return (
    <div ref={ref} className="m sized-preview">
      <div className="common-card-1 p-2 m-2">
        <NavLink to={link} className="text-center nav-link d-link">{budgetary_object.title}</NavLink>
        {
          full_description ? <p>{budgetary_object.description}</p> : <p>{budgetary_object.description}</p>
        }
      </div>
    </div>
  )
})

export default DashboardPreviewCommonWidget