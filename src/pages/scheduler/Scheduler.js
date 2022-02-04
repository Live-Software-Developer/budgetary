import React, { useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import { ScheduleComponent, Inject, Day, Week, Month } from '@syncfusion/ej2-react-schedule'
import '@syncfusion/ej2-base/styles/bootstrap.css'
import PageHolder from '../../components/page/PageHolder'
import PageHeader from '../../components/page/PageHeader'
import PageBody from '../../components/page/PageBody'
import { LoaderComponent } from '../../components/LoaderLabel'

function Scheduler() {
  const [loading, setLoading] = useState(false)
  return (
    <PageHolder>
      <PageHeader page_title="Scheduler" icon={<IoCalendarOutline />} />

      <PageBody>
        <div>
          <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" type="text/css" />
        </div>
        {
          loading &&
          <LoaderComponent />
        }

        <div className="common-card mt-4 p-2 position-relative">
          <ScheduleComponent onChange={e => console.log(e)} actionComplete={e => console.log(e)}>
            <Inject services={[Day, Week, Month]} />
          </ScheduleComponent>
        </div>

      </PageBody>

    </PageHolder>
  )
}

export default Scheduler
