import { forwardRef } from "react"
import { SidebarLink } from "../LeftSidebar"

const Recent = forwardRef(({ title, to, icon, recent_activities }, ref) => {

  return (
    <div ref={ref} className="recent px-3 mb-2">
      <SidebarLink to={to} icon={icon} title={title} />
      <div>

        {
          recent_activities.map((recent_activity, index) => {
            return (
              <div className="recent-activity">
                {recent_activity?.title}
                {recent_activity?.createdAt && recent_activity?.createdAt}
              </div>
            )
          })
        }

      </div>
      <hr />
    </div>
  )
})

export default Recent