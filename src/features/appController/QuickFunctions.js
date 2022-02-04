import { openSnackbar } from "./AppSlice"

const opensnackbar_ = (dispatcher, state, severity, message) => {
  dispatcher(
    openSnackbar({ state, severity, message })
  )
}

export { opensnackbar_ }