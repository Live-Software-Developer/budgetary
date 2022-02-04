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
          {
            doneState === true ? <IoCheckmarkDoneSharp className="text-success" style={{ fontWeight: 500 }} />
              :
              <IoCheckmark style={{ opacity: 0.5, fontWeight: 500 }} />
          }

        </div>

        <div className="my-auto">
          {
            doneState === true ?
              <p className="text-dark m-0 p-0" style={{ fontWeight: 500 }}>{subtodo.text}</p>
              :
              <p className="m-0 p-0" style={{ opacity: 0.5, fontWeight: 500 }}>{subtodo.text}</p>
          }
        </div>

      </div>
      <div className="ml-auto">

        <Switch checked={subtodo.complete} className="my-auto" value={subtodo.complete} onChange={e => (console.log('changed'))} />

      </div>
    </div>
  )
}

export default SingleSubToDo;