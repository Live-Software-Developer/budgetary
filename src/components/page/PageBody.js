import useNetworkStatus from "../../features/hooks/useNetworkStatus";

function PageBody({ children }) {
  const status = useNetworkStatus();

  return (
    <div className="page-body h-100 p-0 position-relative">
      {
        status === false ? (
          <div className="p-2 text-danger">
            You have no internet connection. Tring to connect
          </div>
        )
          :
          (
            <div>

            </div>
          )
      }

      {children}

    </div>
  )
}

export default PageBody