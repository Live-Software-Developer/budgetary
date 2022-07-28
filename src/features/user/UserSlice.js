import { createSlice } from '@reduxjs/toolkit'
import { auth } from './../../app/firebaseConfig'

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },

    logout: (state, action) => {
      state.user = null
      auth.signOut();
    },

  }
})

export const { login, logout } = UserSlice.actions;

export const selectUser = (state) => state.user.user

export default UserSlice.reducer