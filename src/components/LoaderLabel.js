import { Loader } from "uiw"

function LoaderComponent() {

  return (
    <div className="my-5 py-5 d-flex justify-content-center">
      <Loader size='large' />
    </div>
  )
}

function StrongLabel({ title }) {
  return (
    <label className="my-2">
      <strong>{title}</strong>
    </label>
  )
}

export { LoaderComponent, StrongLabel }