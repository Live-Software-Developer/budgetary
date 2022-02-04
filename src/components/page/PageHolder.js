import { useEffect } from "react";
function PageHolder({ children, noScrollTop }) {

  useEffect(() => {
    if (noScrollTop) {

    }
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [])

  return (
    <div className="h-100 mt-2">

      {children}

    </div>
  )
}

export default PageHolder;