import { Link } from "@material-ui/core"
import Masonry from "@mui/lab/Masonry"
import DashboardExpense from "./DashboardExpense"
import DashboardPreviewCommonWidget from "./DashboardPreviewCommonWidget"

function DashboardPreviewRow({ children, link_to, title, type, inputs_, expenses }) {

  return (
    <div className="common-card my-3 p-3">
      <Link to={link_to} className="nav-link">
        <h3 className="text-dark">{title}</h3>
      </Link>

      <Masonry columns={2} spacing={2} className="">
        {
          expenses && expenses?.map((expense, index) => {

            return (
              <div key={index} className="expense-preview" children={<DashboardExpense expense={expense} />} />
            )
          })
        }
        <span></span>
      </Masonry>


      <Masonry columns={2} spacing={2}>
        {
          inputs_?.map((budgetary_object, index) => {

            return (
              <div key={index} children={<DashboardPreviewCommonWidget type={type} budgetary_object={budgetary_object} />} />
            )
          })
        }
        <span></span>
      </Masonry>

      {children}

    </div>
  )
}

export default DashboardPreviewRow