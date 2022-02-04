import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { db, auth, signInWithEmailAndPassword } from '../../app/firebaseConfig';
import { selectUser } from '../../features/user/UserSlice'
import { useNavigate } from 'react-router'
import { setter_func } from '../../Functions';
import PageBody from '../../components/page/PageBody'
import PageHolder from '../../components/page/PageHolder'
import PageHeader from '../../components/page/PageHeader'

import { opensnackbar_ } from '../../features/appController/QuickFunctions';

function Login() {

  const [email, setEmail] = useState('')
  const [pass1, setPass1] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const login_ = () => {

    if (email !== '' || pass1 !== '') {
      signInWithEmailAndPassword(auth, email, pass1).then((userAuth) => {

        if (userAuth) {
          // const q = query()
          // db.collection('users').doc(userAuth.user.uid).onSnapshot(snapshot => {



          // })
          setter_func(userAuth.user, dispatch)
          opensnackbar_(dispatch, true, 'success', 'You have successfully logged in!')
        }

      }).catch(error => {
        opensnackbar_(dispatch, true, 'error', error.message)
      })
    }
    else {
      opensnackbar_(dispatch, true, 'error', 'Please fill all the fields!')
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  return (
    <PageHolder>

      <PageHeader page_title="Login" icon={<FaSignInAlt />} />

      <PageBody>
        <div className="common-card my-md-3 my-sm-2 p-md-3 p-sm-2">
          <form className="form form_ py-2">
            <div className="row">
              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control input_ shadow-none" placeholder="Email" />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Password</label>
                <input value={pass1} onChange={e => setPass1(e.target.value)} type="password" className="form-control input_ shadow-none" placeholder="Password" />
              </div>

            </div>

            <div className="my-3">
              <Button className="btn_" fullWidth={true} onClick={login_}>Login</Button>
            </div>

          </form>
        </div>
      </PageBody>



    </PageHolder>
  )
}

export default Login
