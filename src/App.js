import React, { useEffect, useMemo, useState, Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux'
import { auth, onAuthStateChanged } from './app/firebaseConfig';
import { logout, selectUser } from './features/user/UserSlice';
import { closeModal, openModal, openSnackbar, selectModalState, selectSnackbarState } from './features/appController/AppSlice';

import Alert from './components/alert/Alert';
import { Snackbar } from '@mui/material';
import { setter_func } from './Functions';

import { Outlet } from 'react-router'
import MainSkeleton from './components/skeleton/MainSkeleton';
import NavbarSkeleton from './components/skeleton/NavbarSkeleton';
import SidebarSkeleton from './components/skeleton/SidebarSkeleton';

import './App.css';
import './index.css';
import './styles/LeftSidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MakeAppRoutes = lazy(() =>
  import('./Functions').then((mod) => ({
    default: mod.MakeAppRoutes
  }))
)
// import LeftSidebar from './components/LeftSidebar';
const LeftSidebar = lazy(() => import('./components/LeftSidebar'));
const Navbar = lazy(() => import('./components/Navbar'));


function App() {

  const dispatch = useDispatch()
  // const status = useNetworkStatus()
  const current_modal_state = useSelector(selectModalState)
  const user = useSelector(selectUser)
  const [modalState, setModalState] = useState(current_modal_state)

  const current_snackbarstate_ = useSelector(selectSnackbarState)
  const [current_snackbarstate, setCurrentSnackbarState] = useState(current_snackbarstate_)

  // const { location } = useLocation();


  const openCloseModal = (target_) => {
    dispatch(
      openModal(target_)
    )
  }

  const closeModal_ = () => {
    dispatch(
      closeModal()
    )
  }


  useEffect(() => {

    if (!user) {
      try {
        const unsub = onAuthStateChanged(auth, userAuth => {
          if (userAuth) {
            setter_func(userAuth, dispatch)
          }
          else {
            logout()
          }

        })

        return unsub;

      }
      catch (err) {
        // alert(err)
        console.warn(err, 'an error occured')
      }
    }

    closeModal_()
    // dispatch(
    //   closeSnackbar({ state: false, severity: '', message: '' })
    // )

  }, [])

  useMemo(() => {
    setModalState(current_modal_state)
  }, [current_modal_state])

  useMemo(() => {
    setCurrentSnackbarState(current_snackbarstate_)
  }, [current_snackbarstate_])

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    else {
      dispatch(
        openSnackbar({ state: false, severity: 'info', message: 'Snackbar closed' })
      )
    }

  };



  return (
    <BrowserRouter>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>

      <Snackbar open={current_snackbarstate.state} autoHideDuration={4000} onClick={e => closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={current_snackbarstate.severity} sx={{ width: '100%' }}>
          {current_snackbarstate.message}
        </Alert>
      </Snackbar>

      <div className="container-fluid position-relative top-7 h-100">
        <div className="row h-100 position-relative">
          <div className="col-md-2 position-relative d-none d-md-block bg-white app-left-side p-0" style={{ zIndex: 10 }}>
            <Suspense fallback={<SidebarSkeleton />}>
              <LeftSidebar />
            </Suspense>
          </div>
          <div className="col-md-10 h-100 position-relative app-right-side" style={{ paddingBottom: '0px' }}>
            <Suspense fallback={<MainSkeleton />}>
              <MakeAppRoutes />
            </Suspense>
          </div>
        </div>
      </div>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
