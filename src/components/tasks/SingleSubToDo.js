import { Checkbox } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IoCheckmark, IoCheckmarkDoneSharp } from "react-icons/io5";
import { Switch } from "uiw";

function SingleSubToDo({ subtodo, displaybtn }) {
  const [doneState, setDoneState] = useState(subtodo.complete)
  // const setAsDone = () => {
  //   setDoneState(true);
  // }

  useEffect(() => {
    setDoneState(subtodo.complete);
  }, [subtodo.complete])

  return (
    <div className="d-flex m-1 justify-content-betwen">
      <div className="d-flex">
        <div className="mx-3 my-auto">
          <Checkbox disabled checked={subtodo.complete} className={subtodo.complete ? "text-success" : "t"} />
        </div>

        <div className="my-auto">
          {
            doneState === true ?
              <p className="text-dark m-0 p-0" style={{ fontWeight: 600, fontSize: '218x' }}>{subtodo.text}</p>
              :
              <p className="m-0 p-0" style={{ opacity: 0.5, fontWeight: 600, fontSize: '18px' }}>{subtodo.text}</p>
          }
        </div>

      </div>

    </div>
  )
}

export default SingleSubToDo;