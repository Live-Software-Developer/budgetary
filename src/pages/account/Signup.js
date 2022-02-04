import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { FaSignInAlt } from 'react-icons/fa'

import { auth } from '../../app/firebaseConfig';

import { useDispatch, useSelector } from 'react-redux'

import { login, selectUser } from '../../features/user/UserSlice'

import { db } from '../../app/firebaseConfig'
import { opensnackbar_ } from '../../features/appController/QuickFunctions';
import { useNavigate } from 'react-router';

import PageBody from '../../components/page/PageBody'
import PageHolder from '../../components/page/PageHolder'
import PageHeader from '../../components/page/PageHeader'

function Signup() {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')

  const dispatch = useDispatch()

  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const signUp = (e) => {
    e.preventDefault();

    if (name === '' || username === '' || email === '' || pass1 === '' || pass2 === '') {
      opensnackbar_(dispatch, true, 'error', 'Please fill in all the fields')
    }
    else if (pass1 !== pass2) {
      alert('Passwords do not match')
      opensnackbar_(dispatch, true, 'warning', 'Passwords do match!')
    }
    else {
      auth.createUserWithEmailAndPassword(email, pass1).then((userAuth) => {
        userAuth.user.updateProfile(
          {
            displayName: name,
            photoURL: '',
          }
        ).then(() => {
          dispatch(login(
            {
              userID: userAuth.user.uid,
              email: email,
              displayName: name,
              profilePhotoURL: ''
            }
          ))
          db.collection('users').doc(userAuth.user.uid).set({
            userID: userAuth.user.uid,
            username: username,
            displayName: name,
            profilePhotoURL: '',
            email: email,
            budgets: 0,
            expenses: 0,
            todos: 0,
            notes: 0,
            income: 0
          })
        })
        opensnackbar_(dispatch, true, 'success', 'You have successfully signed up!')
      })
        .catch((error) => {
          opensnackbar_(dispatch, true, 'error', error.message)
        })
    }


  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  return (
    <PageHolder>

      <PageHeader page_title="Sign Up" icon={<FaSignInAlt />} />

      <PageBody>
        <div className="common-card my-md-3 my-sm-2 p-md-3 p-sm-2">
          <form className="form form_ py-2">
            <div className="row">
              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="form-control input_ shadow-none" placeholder="Full name" />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control input_ shadow-none" placeholder="Display name" />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control input_ shadow-none" placeholder="Email" />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Password</label>
                <input value={pass1} onChange={e => setPass1(e.target.value)} type="password" className="form-control input_ shadow-none" placeholder="Password" />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2 label_">Repeat Password</label>
                <input value={pass2} onChange={e => setPass2(e.target.value)} type="password" className="form-control input_ shadow-none" placeholder="Repear password" />
              </div>

            </div>

            <div className="my-3">
              <Button className="btn_" fullWidth={true} onClick={signUp}>Sign up</Button>
            </div>

          </form>
        </div>
      </PageBody>

    </PageHolder>
  )
}

export default Signup
