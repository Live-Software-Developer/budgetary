import React from 'react'
import { FaTimes } from 'react-icons/fa'
import PageBody from '../components/page/PageBody'
import PageHeader from '../components/page/PageHeader'
import PageHolder from '../components/page/PageHolder'

function PageNotFound() {
  return (
    <PageHolder>
      <PageHeader page_title="Page Not Found" icon={<FaTimes />} />
      <PageBody>
        <h4>The page you are looking for is not found on this server</h4>
      </PageBody>
    </PageHolder>
  )
}

export default PageNotFound
