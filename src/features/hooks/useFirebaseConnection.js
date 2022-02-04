import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';

const useFirebaseConnection = () => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    let connectedRef = firebase.database().ref(".info/connected");
    // let connectRef = firebase.auth()
    connectedRef.on("value", function (snap) {
      if (snap.val() === true) {
        setStatus(true)
      } else {
        // alert("not connected");
        setStatus(false)
      }
    });

  }, [])

  return status
}

export default useFirebaseConnection