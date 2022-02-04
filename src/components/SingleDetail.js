
function SingleDetails({ title, value }) {

  return (
    <div className="row p-2">
      <div className="col-4">
        <p className="p-0 m-0 word-wrap whitespace-wrap"><strong>{title}</strong></p>
      </div>
      <div className="col-8">
        <p className="p-0 m-0">
          {value}
        </p>

      </div>
    </div>
  )
}


export default SingleDetails
