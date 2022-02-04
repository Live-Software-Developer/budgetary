import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { selectUser } from '../features/user/UserSlice';
import { Redirect } from 'react-router'

function ProtectedUrl({ path, component }) {

  const user = useSelector(selectUser)


  return (
    <Route exact path={path} render={data => user !== null ? component : <Redirect to="/login/" />} />
  )
}

export default ProtectedUrl
