import { Button } from "@material-ui/core"
import { forwardRef } from "react"

const BudgetHeader = forwardRef(({ header, buttons, onebutton, swapUp, swapDown, delete_func }, ref) => {

  return (
    <div ref={ref} className="row my-1">
      <div className="col-4 d-flex h-100 align-self-center">
        <h4 className="text-capitalize">{header.type}</h4>
      </div>
      <div className="col-7">
        <Button ref={ref} className="budget-header m-2 w-100 d-flex justify-content-between">
          <div>
            {header.headerName}
          </div>
        </Button>
      </div>
    </div>
  )
})

export default BudgetHeader