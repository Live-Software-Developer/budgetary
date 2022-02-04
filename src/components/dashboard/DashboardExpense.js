import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const DashboardExpense = forwardRef(({ expense }, ref) => {


  const link = `/expenses/view/${expense?.id}/${expense.date}`;

  return (
    <div ref={ref} className="e">
      <div className="common-card-1 m-2 p-3">
        <NavLink to={link} className="text-center">{expense?.date && expense?.date}</NavLink>
      </div>
    </div>
  )
})

export default DashboardExpense