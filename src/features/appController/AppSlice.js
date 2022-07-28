import { createSlice } from '@reduxjs/toolkit'

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    app: {
      incomes: [],
      budgets: [],
      expenses: [],
      tasks: [],
      notes: [],

    },
    modalState: {
      open: false,
      target: '',
      modalTitle: '',
      modalSubTitle: '',
      component: null,
      something: 'null'
    },
    snackbarState: {
      state: false,
      severity: '',
      message: ''
    }
  },
  reducers: {
    openModal: (state, action) => {
      state.modalState.open = true
      state.modalState.target = action.payload.target
      state.modalState.modalTitle = action.payload.title
      state.modalState.modalSubTitle = action.payload.subtitle
      state.modalState.component = action.payload.component
    },

    closeModal: (state, action) => {
      state.modalState.open = false
      state.modalState.target = ''
      state.modalState.modalTitle = ''
      state.modalState.modalSubTitle = ''
      state.modalState.component = null
    },

    setBudgets: (state, action) => {
      state.app.budgets = action.payload
    },

    setExpenses: (state, action) => {
      state.app.expenses = action.payload
    },

    setTasks: (state, action) => {
      state.app.tasks = action.payload
    },

    setNotes: (state, action) => {
      state.app.notes = action.payload
    },

    setIncomes: (state, action) => {
      state.app.incomes = action.payload
    },

    openSnackbar: (state, action) => {
      state.snackbarState.state = action.payload.state
      state.snackbarState.severity = action.payload.severity
      state.snackbarState.message = action.payload.message
    },

    closeSnackbar: (state, action) => {
      state.snackbarState.state = false
      state.snackbarState.severity = ''
      state.snackbarState.message = ''
    }

  }
})

export const { openModal, closeModal, setIncomes, setBudgets, setExpenses, setTasks, setNotes, openSnackbar, closeSnackbar } = AppSlice.actions;

export const selectModalState = (state) => state.app.modalState
export const selectAppState = (state) => state.app.app
export const selectSnackbarState = state => state.app.snackbarState

export default AppSlice.reducer